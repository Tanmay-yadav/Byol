import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  BookOpenCheck,
  GraduationCap,
  HeartHandshake,
  MoveUpRight,
} from "lucide-react";
import { AdaptiveDemo } from "@/components/AdaptiveDemo";
import { ApprovalNotice } from "@/components/ApprovalNotice";
import { JsonLd } from "@/components/JsonLd";
import { MasteryMap } from "@/components/MasteryMap";
import {
  audiences,
  benefits,
  copy,
  engineSteps,
  platforms,
  principles,
  shippable,
  stats,
} from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const platformIcons = {
  medicoplasma: BrainCircuit,
  schools: BookOpenCheck,
  colleges: GraduationCap,
};

const audienceIcons = {
  medical: BrainCircuit,
  school: BookOpenCheck,
  college: GraduationCap,
  institution: HeartHandshake,
};

export default function HomePage() {
  const visiblePlatforms = shippable(platforms);
  const visibleStats = shippable(stats);

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <section className="hero-section">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow eyebrow--pill">
              <span className="eyebrow__spark" aria-hidden="true">✳</span>
              {copy.hero.eyebrow}
            </p>
            <h1>{copy.hero.title}</h1>
            <p className="hero-lede">{copy.hero.description}</p>
            <div className="hero-actions">
              <a className="button button--primary button--large" href="#platforms" data-analytics-event="cta_click" data-analytics-id="hero_explore">
                {copy.hero.explore}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <Link className="button button--secondary button--large" href="/contact?intent=institution" data-analytics-event="cta_click" data-analytics-id="hero_demo">
                {copy.navigation.requestDemo}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-features" aria-label="Platform highlights">
              {copy.hero.features.map((feature) => (
                <span key={feature}><i aria-hidden="true">✓</i>{feature}</span>
              ))}
            </div>
            <p className="hero-trust-line">
              <span className="hero-trust-line__dot" aria-hidden="true" />
              {copy.hero.proof}
            </p>
          </div>
          <div className="hero-art-wrap">
            <div className="hero-art-backdrop" aria-hidden="true" />
            <div className="hero-art">
              <div className="hero-art__top">
                <span><i aria-hidden="true" /> Learning snapshot</span>
                <span className="hero-art__dots" aria-hidden="true">•••</span>
              </div>
              <div className="hero-art__content">
                <div className="hero-art__heading">
                  <div>
                    <p className="eyebrow">Your learning map</p>
                    <p className="hero-art__subheading">Knowledge, connected.</p>
                  </div>
                  <span className="hero-art__badge">Sample</span>
                </div>
                <MasteryMap compact />
                <div className="hero-art__footer">
                  <span><i className="legend-dot legend-dot--steady" />Building understanding</span>
                  <span><MoveUpRight size={16} aria-hidden="true" /></span>
                </div>
              </div>
              <div className="hero-sticker" aria-label="Illustrative example">A path<br />that adapts <span aria-hidden="true">✳</span></div>
              <span className="hero-orbit hero-orbit--one" aria-hidden="true" />
              <span className="hero-orbit hero-orbit--two" aria-hidden="true" />
            </div>
            <p className="hero-art-caption">{copy.hero.visualLabel} · Not real learner data</p>
          </div>
        </div>
        <a className="hero-scroll" href="#audiences">
          <span>Find your learning path</span>
          <ArrowDown size={15} aria-hidden="true" />
        </a>
      </section>

      <section className="section section--audiences" id="audiences" aria-labelledby="audience-title">
        <div className="shell">
          <div className="section-heading section-heading--row">
            <div>
              <p className="eyebrow">{copy.audience.eyebrow}</p>
              <h2 id="audience-title">{copy.audience.title}</h2>
            </div>
            <p>{copy.audience.intro}</p>
          </div>
          <div className="audience-grid">
            {audiences.map((audience, index) => {
              const Icon = audienceIcons[audience.id];
              return (
                <Link
                  className={`audience-card audience-card--${index + 1}`}
                  href={audience.href}
                  key={audience.id}
                  data-analytics-event="audience_select"
                  data-analytics-value={audience.id}
                >
                  <span className="audience-card__icon"><Icon size={21} strokeWidth={1.8} aria-hidden="true" /></span>
                  <span className="audience-card__text">
                    <strong>{audience.title}</strong>
                    <span>{audience.detail}</span>
                  </span>
                  <span className="audience-card__arrow"><ArrowUpRight size={17} aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--platforms" id="platforms" aria-labelledby="platforms-title">
        <div className="shell">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">{copy.platformSection.eyebrow}</p>
            <h2 id="platforms-title">{copy.platformSection.title}</h2>
            <p>{copy.platformSection.intro}</p>
          </div>
          <div className="platform-grid">
            {visiblePlatforms.map((platform, index) => {
              const Icon = platformIcons[platform.id];
              return (
                <article className={`platform-card platform-card--${platform.id}`} key={platform.id}>
                  <div className="platform-card__top">
                    <span className="platform-card__icon"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                    <span className="platform-card__index">0{index + 1}</span>
                    <ApprovalNotice approved={platform.approved} />
                  </div>
                  <p className="platform-card__audience">{platform.audience}</p>
                  <h3>{platform.name}</h3>
                  <p className="platform-card__summary">{platform.summary}</p>
                  <ul className="platform-features">
                    {platform.features.map((feature) => (
                      <li key={feature}><span aria-hidden="true">↗</span>{feature}</li>
                    ))}
                  </ul>
                  <a
                    className="platform-card__link"
                    href={platform.href}
                    rel="noopener noreferrer"
                    data-analytics-event="platform_card_click"
                    data-analytics-value={platform.id}
                  >
                    {platform.ctaLabel}
                    <ArrowUpRight size={17} aria-hidden="true" />
                    <span className="sr-only">(opens another BYOL platform)</span>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--approach" aria-labelledby="approach-title">
        <div className="shell approach-grid">
          <div className="approach-intro">
            <p className="eyebrow">{copy.benefitsSection.eyebrow}</p>
            <h2 id="approach-title">{copy.benefitsSection.title}</h2>
            <p>{copy.benefitsSection.intro}</p>
            <Link className="text-link" href="/about">
              More about our approach
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <span className="approach-deco" aria-hidden="true">✳</span>
          </div>
          <div className="benefit-grid">
            {benefits.map((benefit) => (
              <article className="benefit-card" key={benefit.number}>
                <span className="benefit-card__number">{benefit.number}</span>
                <span className="benefit-card__icon" aria-hidden="true">{benefit.icon}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--engine" id="how-it-works" aria-labelledby="engine-title">
        <div className="shell">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">{copy.engineSection.eyebrow}</p>
            <h2 id="engine-title">{copy.engineSection.title}</h2>
            <p>{copy.engineSection.intro}</p>
          </div>
          <ol className="engine-steps">
            {engineSteps.map((step, index) => (
              <li className="engine-step" key={step.title}>
                <span className="engine-step__number">0{index + 1}</span>
                <span className="engine-step__node" aria-hidden="true">{index === engineSteps.length - 1 ? "↺" : "↗"}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
          <p className="engine-disclaimer">
            <span aria-hidden="true">ⓘ</span>
            {copy.engineSection.disclaimer}
          </p>
        </div>
      </section>

      <section className="section section--demo" id="see-it-adapt" aria-labelledby="demo-title">
        <div className="shell demo-layout">
          <div className="demo-intro">
            <p className="eyebrow">{copy.demoSection.eyebrow}</p>
            <h2 id="demo-title">{copy.demoSection.title}</h2>
            <p>{copy.demoSection.description}</p>
            <div className="demo-note">
              <span className="demo-note__icon" aria-hidden="true">✳</span>
              <p>This short experience uses sample questions and an illustrative learning estimate. It does not connect to learner accounts or BYOL’s production engine.</p>
            </div>
            <span className="demo-intro__scribble" aria-hidden="true">Try it <ArrowRight size={20} /></span>
          </div>
          <AdaptiveDemo />
        </div>
      </section>

      <section className="section section--proof" aria-labelledby="proof-title">
        <div className="shell proof-layout">
          <div className="proof-copy">
            <p className="eyebrow">{copy.proofSection.eyebrow}</p>
            <h2 id="proof-title">{copy.proofSection.title}</h2>
            <p>{copy.proofSection.description}</p>
            <span className="proof-caption">{copy.proofSection.statsCaption}</span>
          </div>
          <div className="proof-stats">
            {visibleStats.map((stat) => (
              <div className="proof-stat" key={stat.id}>
                <ApprovalNotice approved={stat.approved} />
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
            <p className="proof-no-logos">Institution names and learner stories will be shared here when permissions are in place.</p>
          </div>
        </div>
      </section>

      <section className="section section--trust" id="responsible-ai" aria-labelledby="trust-title">
        <div className="shell">
          <div className="trust-heading">
            <div>
              <p className="eyebrow">{copy.trustSection.eyebrow}</p>
              <h2 id="trust-title">{copy.trustSection.title}</h2>
            </div>
            <Link className="text-link" href="/about#responsible-ai">
              {copy.trustSection.aboutLink}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="trust-columns">
            <article className="trust-card trust-card--does">
              <span className="trust-card__label"><span aria-hidden="true">+</span> In support of learning</span>
              <h3>{copy.trustSection.doesTitle}</h3>
              <ul>
                {copy.trustSection.does.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
              </ul>
            </article>
            <article className="trust-card trust-card--does-not">
              <span className="trust-card__label"><span aria-hidden="true">−</span> With human judgment</span>
              <h3>{copy.trustSection.doesNotTitle}</h3>
              <ul>
                {copy.trustSection.doesNot.map((item) => <li key={item}><span aria-hidden="true">×</span>{item}</li>)}
              </ul>
            </article>
          </div>
          <div className="principles-row">
            <h3>{copy.trustSection.principlesTitle}</h3>
            <ul>
              {principles.map((principle, index) => (
                <li key={principle}><span>0{index + 1}</span>{principle}</li>
              ))}
            </ul>
          </div>
          <p className="trust-disclaimer">{copy.trustSection.disclaimer}</p>
        </div>
      </section>

      <section className="section section--institutions" aria-labelledby="institution-title">
        <div className="shell institution-panel">
          <div className="institution-panel__visual" aria-hidden="true">
            <div className="institution-orbit institution-orbit--outer" />
            <div className="institution-orbit institution-orbit--inner" />
            <span className="institution-star">✳</span>
            <span className="institution-line institution-line--one" />
            <span className="institution-line institution-line--two" />
            <span className="institution-line institution-line--three" />
            <span className="institution-visual-label">Learning, connected.</span>
          </div>
          <div className="institution-panel__copy">
            <p className="eyebrow">{copy.institutions.eyebrow}</p>
            <h2 id="institution-title">{copy.institutions.title}</h2>
            <p>{copy.institutions.description}</p>
            <Link className="button button--light" href="/contact?intent=institution" data-analytics-event="cta_click" data-analytics-id="closing_institution">
              {copy.institutions.cta}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="closing-title">
        <div className="shell closing-content">
          <p className="eyebrow">{copy.closing.eyebrow}</p>
          <h2 id="closing-title">{copy.closing.title}</h2>
          <div className="closing-actions">
            <Link className="closing-link" href="/#platforms" data-analytics-event="cta_click" data-analytics-id="closing_learner">
              <span><small>For learners</small><strong>{copy.closing.learner}</strong></span>
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
            <Link className="closing-link" href="/contact?intent=institution" data-analytics-event="cta_click" data-analytics-id="closing_institution">
              <span><small>For institutions</small><strong>{copy.closing.institution}</strong></span>
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
