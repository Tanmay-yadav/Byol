# BYOL Academy launch checklist

Status key: **Done** means implemented and locally verified; **Partial** means some implementation is present but an approval, asset, audit, or operational dependency remains; **Blocked** means launch must wait for a required human or provider action.

| Requirement | Status | Implementation and remaining work |
|---|---|---|
| R1 — Make adaptivity visible with an interactive, illustrative demo | Done | Keyboard-operable three-question sample for Medicine, School maths, and College aptitude; visibly labelled as a simulation, with map and table output. |
| R2 — Route each audience within 10 seconds | Done | Medical, school, college, and institution pathways appear directly below the hero. |
| R3 — Two CTA paths for learners and institutions | Done | Explore-platform and request-demo paths are prominent in the hero and closing section; institution links prefill the contact intent. |
| R4 — Expose products and company pages in navigation | Partial | Product destinations, How it works, Research, Blog, About, Contact, and demo CTA are present. Login is omitted because no URL was supplied. Confirm official social URLs and final navigation choices. |
| R5 — Proof with metrics, logos, and testimonials | Partial | Published figures (20 institutions, 13k+ learners) are shown. Logos and testimonials are withheld because usage permission was not supplied. Add only after written approval. |
| R6 — Responsible-AI explanation and disclaimers | Done | The site states what the AI does and does not do, provides six design principles, and distinguishes conceptual design from deployed models and compliance claims. |
| R7 — Privacy and Terms routes and consent behaviour | Blocked | Both routes exist and clearly state that approved legal content is pending. Lead capture is disabled until legal copy and consent wording are approved. Obtain legal documents and review before launch. |
| R8 — Mobile-first performance | Partial | Responsive layout, CSS/SVG visuals, and a small interactive demo are implemented. Run Lighthouse on a production deployment and verify the guide's performance, LCP, INP, CLS, and JS budgets. |
| R9 — WCAG 2.2 AA | Partial | Automated axe found zero serious/critical issues on seven routes and the completed demo at mobile and desktop widths. Semantic landmarks, skip link, visible focus, reduced motion, labels, live regions, and text alternatives are implemented; manual keyboard, screen-reader, and real-device checks remain. |
| R10 — SEO, sitemap, robots, structured data | Partial | Metadata, canonical URLs, Open Graph image, Organization/WebSite JSON-LD, sitemap, and preview noindex rules are implemented. Confirm the canonical domain and validate the live sitemap/structured data after deployment. |
| R11 — Privacy-respecting analytics | Partial | Vercel Analytics and a typed event wrapper are wired for production, with no PII in event properties. Confirm the hosting analytics configuration, event plan, and privacy notice with the team. |
| R12 — Secure lead capture | Partial | Server validation, same-origin check, bounded request body, honeypot, hashed-IP rate limiting, and Resend delivery are implemented. Supply production credentials and legal approvals; test throttling and delivery in preview. |
| R13 — Typed content and approval governance | Partial | Platform/stat content is typed and filtered by `approved` for production. Confirm all public-facing copy and assets with the team before publication. |
| R14 — Maintainable code, tests, and CI | Partial | Strict TypeScript, lint/typecheck/test/build scripts, focused unit tests, and CI workflow are included. Run CI and address any environment-specific failures. |
| R15 — i18n-ready structure | Partial | Locale is set to `en-IN`; content is grouped in typed modules to support later extraction. Hindi is deferred; complete a copy audit to move remaining interface strings into localization-ready content before adding another locale. |

## Required launch blockers

- Publish legal-approved Privacy Policy and Terms of Use copy.
- Obtain approval for lead-consent text and enable the form only after approval.
- Configure Resend and Upstash credentials and verify enquiry delivery and rate limits.
- Confirm brand assets, official social URLs, login destination (if any), and permission to publish testimonials/logos.
- Run production Lighthouse, axe, browser, keyboard, and real-device checks; record results here.
- Confirm canonical domain, deployment provider, monitoring, and rollback owner.
