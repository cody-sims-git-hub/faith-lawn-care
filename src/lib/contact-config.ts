/**
 * Client-side contact configuration.
 *
 * Only the Turnstile *site* key lives here — it is public by design and is
 * meant to be in the bundle. The secret key, the Resend API key, and the
 * destination inbox all live server-side in the Pages Function environment and
 * never reach the browser.
 */
export const contactConfig = {
  /** Cloudflare Pages Function that verifies the token and relays the email. */
  endpoint: "/api/quote",
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? "",
};

/** Turnstile is optional in local dev; in production its absence is a real gap. */
if (import.meta.env.PROD && !contactConfig.turnstileSiteKey) {
  console.warn(
    "PUBLIC_TURNSTILE_SITE_KEY is not set — the quote form will submit without a CAPTCHA.",
  );
}
