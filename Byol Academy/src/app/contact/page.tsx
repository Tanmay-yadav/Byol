import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { copy, platforms } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact BYOL Academy",
  description:
    "Get in touch with BYOL Academy to explore learning platforms for learners, families, schools and institutions.",
  alternates: { canonical: "/contact" },
};

type ContactPageProps = {
  searchParams: Promise<{ intent?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const intent = params.intent;
  return (
    <>
      <section className="page-hero page-hero--contact">
        <div className="shell page-hero__inner">
          <p className="eyebrow">{copy.contact.eyebrow}</p>
          <h1>{copy.contact.title}</h1>
          <p>{intent === "institution" ? copy.contact.institutionDescription : copy.contact.description}</p>
          <span className="page-hero__shape page-hero__shape--contact" aria-hidden="true">✳</span>
        </div>
      </section>
      <section className="section contact-section">
        <div className="shell contact-layout">
          <div className="contact-aside">
            <p className="eyebrow">Get started</p>
            <h2>One conversation can help you find the right path.</h2>
            <p>Looking for a learning platform now? You can explore BYOL’s platforms directly.</p>
            <div className="contact-platform-links">
              {platforms.map((platform) => (
                <a href={platform.href} key={platform.id} rel="noopener noreferrer">
                  <span><strong>{platform.name}</strong><small>{platform.audience}</small></span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="contact-form-panel">
            <LeadForm initialIntent={intent} />
          </div>
        </div>
      </section>
      <section className="contact-footnote">
        <div className="shell">
          <p>Before sharing personal information, please review the <Link href="/privacy">{copy.legal.privacy}</Link>. The policy is pending legal review.</p>
        </div>
      </section>
    </>
  );
}
