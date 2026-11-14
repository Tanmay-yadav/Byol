# BYOL Academy website

A responsive Next.js App Router website for BYOL Academy. The site follows the supplied build guide and keeps approved content, product destinations, and demo data in typed files under `src/content`.

## Local development

Requirements: Node.js 22 LTS and npm.

```powershell
npm install
npm run dev
```

The site is available at `http://localhost:3000`. The lead form is intentionally disabled unless its public and server-side enablement flags, approved-consent flag, Resend credentials, and Upstash Redis credentials are configured.

## Light and dark themes

The theme button in the site header switches the entire site between light and dark mode. The choice is saved in `localStorage` as `byol-theme`; when there is no saved choice, the site follows the visitor's operating-system color preference.

How it works:

1. `src/app/layout.tsx` runs a tiny `beforeInteractive` script to set `data-theme` on the root `<html>` before the page is painted. This prevents a light-theme flash when dark mode was previously selected.
2. `src/components/Header.tsx` renders the accessible toggle button. Clicking it changes `data-theme`, saves the choice, and updates the icon and button label.
3. `src/styles/globals.css` defines the shared color variables and uses `[data-theme="dark"]` selectors to restyle page sections, cards, forms, and other components site-wide.
4. `tests/e2e/site.spec.ts` checks system preference, saved choices, and dark-mode styles on multiple routes.

To add dark-mode support for a new component, prefer the existing `--color-*` variables for its foregrounds, borders, and surfaces. If it needs a special light background, add a matching `[data-theme="dark"]` rule in `globals.css`.

## Verification

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

## Deployment configuration

Copy `.env.example` into the hosting provider's environment settings. Configure:

- `NEXT_PUBLIC_SITE_URL` to the canonical production origin.
- `NEXT_PUBLIC_ANALYTICS_ENABLED=true` only after the privacy notice and analytics configuration are approved.
- `NEXT_PUBLIC_LEAD_FORM_ENABLED=true` only after legal review and delivery setup.
- `LEAD_FORM_ENABLED=true` and `LEAD_CONSENT_APPROVED=true` only after the Privacy Policy and consent copy are approved.
- `RESEND_API_KEY`, `LEAD_TO_EMAIL`, and `LEAD_FROM_EMAIL` for enquiry delivery.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for per-IP rate limiting.

No lead request is sent to a third party unless the visitor submits the form; the form and API stay disabled by default. The interactive learning demo is a local illustrative simulation and does not represent BYOL's production engine.

## Content and launch notes

The provided guide says not to invent legal text, testimonials, institution logos, or unapproved claims. Privacy and Terms routes therefore identify their pending review status, and lead submission is gated until the policy and consent language are approved. See [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) before launch.
