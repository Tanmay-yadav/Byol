import type { Metadata } from "next";
import Link from "next/link";
import { brand, copy } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy information for ${brand.name}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="legal-page">
      <div className="shell legal-page__inner">
        <p className="eyebrow">{copy.legal.eyebrow}</p>
        <h1>{copy.legal.privacy}</h1>
        <div className="legal-pending" role="status">
          <span className="legal-pending__icon" aria-hidden="true">!</span>
          <div>
            <h2>{copy.legal.pending}</h2>
            <p>{copy.legal.description}</p>
          </div>
        </div>
        <p className="legal-note">
          This page is not a Privacy Policy. The website’s enquiry form remains disabled until the approved policy and consent language are published.
        </p>
        <Link className="text-link" href="/contact">Contact BYOL Academy <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
