import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { engineSteps, principles, copy } from "@/content/site";

export const metadata: Metadata = {
  title: "About BYOL Academy",
  description:
    "Learn about BYOL Academy’s adaptive-learning vision, research directions, and responsible AI principles.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero page-hero--about">
        <div className="shell page-hero__inner">
          <p className="eyebrow">{copy.about.eyebrow}</p>
          <h1>{copy.about.title}</h1>
          <p>{copy.about.description}</p>
          <Link className="text-link" href="/#platforms">
            Explore our platforms
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <span className="page-hero__shape" aria-hidden="true">b.</span>
        </div>
      </section>

      <section className="section section--about-engine" aria-labelledby="about-engine-title">
        <div className="shell about-engine-grid">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 id="about-engine-title">{copy.about.engineTitle}</h2>
            <p>{copy.about.engineDescription}</p>
          </div>
          <ol className="about-engine-steps">
            {engineSteps.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="shell"><p className="engine-disclaimer">{copy.engineSection.disclaimer}</p></div>
      </section>

      <section className="section section--research" id="research" aria-labelledby="research-title">
        <div className="shell research-layout">
          <div className="research-aside">
            <span className="research-aside__number">01</span>
            <span>Research<br />&amp; practice</span>
          </div>
          <div className="research-copy">
            <p className="eyebrow">{copy.about.researchEyebrow}</p>
            <h2 id="research-title">{copy.about.researchTitle}</h2>
            <p>{copy.about.researchDescription}</p>
            <div className="research-callout">
              <span aria-hidden="true">“</span>
              <p>Learning signals are useful evidence, not the whole story.</p>
            </div>
            <Link className="text-link" href="/#how-it-works">
              See our conceptual learning loop
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--about-principles" id="responsible-ai" aria-labelledby="about-principles-title">
        <div className="shell">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">Responsible by design</p>
            <h2 id="about-principles-title">{copy.about.responsibleTitle}</h2>
            <p>{copy.about.responsibleDescription}</p>
          </div>
          <ul className="principle-cards">
            {principles.map((principle, index) => (
              <li key={principle}><span>0{index + 1}</span><strong>{principle}</strong></li>
            ))}
          </ul>
          <p className="trust-disclaimer">{copy.trustSection.disclaimer}</p>
        </div>
      </section>

      <section className="about-cta">
        <div className="shell about-cta__inner">
          <div><p className="eyebrow">Keep exploring</p><h2>Find the platform that fits your next step.</h2></div>
          <Link className="button button--primary" href="/#platforms">Explore platforms <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
