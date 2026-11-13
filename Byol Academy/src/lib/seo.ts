import { brand } from "@/content/site";

export function absoluteUrl(path = ""): string {
  return new URL(path, brand.siteUrl).toString();
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: brand.siteUrl,
  description: brand.description,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: brand.name,
  url: brand.siteUrl,
  inLanguage: "en-IN",
};
