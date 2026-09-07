/**
 * POST /api/quote — Cloudflare Pages Function.
 *
 * Takes a quote request, verifies it is not a bot, and relays it to the owner's
 * inbox via Resend. Nothing is stored: there is no database, no KV, and no log
 * of submission contents.
 *
 * This exists because a static page cannot send email on its own — doing so
 * requires a credential, and a credential in the browser bundle is a public
 * credential. Keeping it in the Function is the whole point.
 *
 * Required environment (Pages project settings → Environment variables):
 *   RESEND_API_KEY      secret — Resend API key
 *   LEAD_TO_EMAIL       the inbox that receives quote requests
 *   LEAD_FROM_EMAIL     verified Resend sender, e.g. website@faithlawncarellc.com
 *   TURNSTILE_SECRET_KEY secret — pairs with PUBLIC_TURNSTILE_SITE_KEY
 */

interface Env {
  RESEND_API_KEY: string;
  LEAD_TO_EMAIL: string;
  LEAD_FROM_EMAIL: string;
  TURNSTILE_SECRET_KEY?: string;
}

/** Cap every field so an oversized body cannot be used to stuff the inbox. */
const LIMITS: Record<string, number> = {
  name: 120,
  phone: 40,
  email: 200,
  town: 120,
  service: 120,
  details: 4000,
};

/**
 * A FormData value is a string or a File. @cloudflare/workers-types does not
 * ship the DOM's `FormDataEntryValue` alias, so it is spelled out here rather
 * than pulling the whole DOM lib into a Workers program.
 */
type FormValue = string | File | null;

const clean = (value: FormValue, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/**
 * Escapes text for interpolation into the HTML email body. Submissions are
 * attacker-controlled, and the person reading them is the business owner — the
 * one inbox we least want to hand an injected payload.
 */
const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] as string,
  );

/**
 * Strips CR/LF so a submitted value cannot inject extra headers when it is used
 * in the Reply-To or Subject line.
 */
const headerSafe = (value: string): string => value.replace(/[\r\n]+/g, " ").trim();

async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string | null,
): Promise<boolean> {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // A browser without JS posts a normal form and expects a page back; the
  // Alpine path sets Accept: application/json and expects JSON.
  const wantsJson = (request.headers.get("Accept") ?? "").includes("application/json");

  const reply = (status: number, payload: { ok?: boolean; error?: string }) => {
    if (wantsJson) {
      return new Response(JSON.stringify(payload), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Non-JS: redirect to a real page either way. 303 so a refresh does not
    // re-post the form.
    const target = payload.ok ? "/thank-you" : "/contact?error=1";
    return new Response(null, { status: 303, headers: { Location: target } });
  };

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(400, { error: "We could not read that submission." });
  }

  // Honeypot: a real person never sees this field.
  if (clean(form.get("company"), 200)) {
    // Answer as though it succeeded. Telling a bot it was caught just teaches
    // whoever wrote it to stop filling the field.
    return reply(200, { ok: true });
  }

  const name = clean(form.get("name"), LIMITS.name);
  const phone = clean(form.get("phone"), LIMITS.phone);
  const email = clean(form.get("email"), LIMITS.email);
  const town = clean(form.get("town"), LIMITS.town);
  const service = clean(form.get("service"), LIMITS.service);
  const details = clean(form.get("details"), LIMITS.details);

  if (!name || !phone || !town) {
    return reply(400, { error: "Please fill in your name, phone, and town." });
  }

  // Turnstile. If no secret is configured the check is skipped — which is fine
  // in local dev and is surfaced as a build-time warning in production.
  if (env.TURNSTILE_SECRET_KEY) {
    const token = clean(form.get("cf-turnstile-response"), 4000);
    if (!token) {
      return reply(400, { error: "Please complete the verification challenge." });
    }
    const ok = await verifyTurnstile(
      token,
      env.TURNSTILE_SECRET_KEY,
      request.headers.get("CF-Connecting-IP"),
    );
    if (!ok) {
      return reply(400, { error: "Verification failed. Please try again." });
    }
  }

  if (!env.RESEND_API_KEY || !env.LEAD_TO_EMAIL || !env.LEAD_FROM_EMAIL) {
    // Misconfiguration must be loud in the logs and honest to the visitor —
    // never a silent success that drops the lead on the floor.
    console.error("Quote form is not configured: missing Resend env vars.");
    return reply(500, {
      error: "Our form is temporarily unavailable — please call or text us instead.",
    });
  }

  const subject = headerSafe(
    `New quote request — ${name}${town ? ` (${town})` : ""}`,
  );

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "—"],
    ["Town", town],
    ["Service", service || "Not specified"],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px">
      <h2 style="margin:0 0 4px">New quote request</h2>
      <p style="margin:0 0 20px;color:#666">From faithlawncarellc.com</p>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px 8px 0;color:#666;vertical-align:top;white-space:nowrap">${label}</td>
            <td style="padding:8px 0;font-weight:600">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      ${
        details
          ? `<div style="margin-top:20px">
               <p style="margin:0 0 6px;color:#666">Details</p>
               <div style="padding:12px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap">${escapeHtml(
                 details,
               )}</div>
             </div>`
          : ""
      }
      <p style="margin-top:24px">
        <a href="tel:${encodeURIComponent(phone)}" style="font-weight:600">Call ${escapeHtml(phone)}</a>
      </p>
    </div>`;

  const text = [
    "New quote request — faithlawncarellc.com",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    details ? `Details:\n${details}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.LEAD_FROM_EMAIL,
        to: [env.LEAD_TO_EMAIL],
        subject,
        html,
        text,
        // So hitting reply in the inbox goes to the customer, when they gave one.
        ...(email ? { reply_to: headerSafe(email) } : {}),
      }),
    });

    if (!res.ok) {
      // Log the provider's reason; never leak it to the visitor.
      console.error("Resend rejected the message", res.status, await res.text());
      return reply(502, {
        error: "We could not send that just now — please call or text us instead.",
      });
    }
  } catch (error) {
    console.error("Resend request failed", error);
    return reply(502, {
      error: "We could not send that just now — please call or text us instead.",
    });
  }

  return reply(200, { ok: true });
};

// Only onRequestPost is exported on purpose. Pages Functions answers any other
// method on this route with a 405 automatically, and exporting a catch-all
// `onRequest` alongside a method handler makes which one wins ambiguous.
