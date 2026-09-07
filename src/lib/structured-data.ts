/**
 * schema.org JSON-LD builders.
 *
 * Everything reads from site-meta / areas / services, so the structured data
 * cannot drift from what is rendered on the page — which is the failure mode
 * that gets rich results revoked.
 *
 * The business is mobile (crews travel to the property), so this is a
 * LocalBusiness with `areaServed` and NO postal address. Publishing a fake
 * storefront address to "help local SEO" is exactly what gets a Google Business
 * Profile suspended.
 */

import {
  SITE_URL,
  SITE_NAME,
  LEGAL_NAME,
  PHONE_E164,
  BASE_CITY,
  BASE_STATE,
  BASE_STATE_CODE,
  GEO,
  FACEBOOK_URL,
  HOURS_SPEC,
  OG_IMAGE,
} from "./site-meta";
import { areas, countiesServed } from "./areas";
import type { Service } from "./services";

const BUSINESS_ID = `${SITE_URL}/#business`;

export function localBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    telephone: PHONE_E164,
    image: OG_IMAGE,
    description:
      "Full-service lawn care, landscaping, and junk removal serving Marianna and the surrounding Jackson, Calhoun, and Liberty county communities.",
    priceRange: "$$",
    sameAs: [FACEBOOK_URL],
    // No streetAddress: this is a mobile service with no storefront. The city
    // and region still anchor local relevance.
    address: {
      "@type": "PostalAddress",
      addressLocality: BASE_CITY,
      addressRegion: BASE_STATE_CODE,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.lat,
      longitude: GEO.lng,
    },
    areaServed: [
      ...countiesServed.map((county) => ({
        "@type": "AdministrativeArea",
        name: `${county}, ${BASE_STATE}`,
      })),
      ...areas.map((a) => ({
        "@type": "City",
        name: `${a.name}, ${a.state}`,
      })),
    ],
    openingHoursSpecification: HOURS_SPEC.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_E164,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
  };
}

export function serviceCatalog(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${SITE_NAME} services`,
    url: `${SITE_URL}/services`,
    itemListElement: services.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.blurb,
        url: `${SITE_URL}/services/${s.slug}`,
      },
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    url: `${SITE_URL}/services/${service.slug}`,
    serviceType: service.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: countiesServed.map((county) => ({
      "@type": "AdministrativeArea",
      name: `${county}, ${BASE_STATE}`,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} — what's included`,
      itemListElement: service.includes.map((item, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

export function breadcrumbs(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${SITE_URL}${step.path}`,
    })),
  };
}

export function faqPage(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
