import type { Metadata } from "next";
import Link from "next/link";
import { copy } from "@/content/site";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return (
    <section className="styleguide-page">
      <div className="shell">
        <p className="eyebrow">BYOL Academy · Design system</p>
        <h1>Clarity, warmth, and a little light.</h1>
        <p className="styleguide-intro">A preview of the reusable visual language and accessible controls used across the website.</p>
        <div className="styleguide-section">
          <h2>Colour tokens</h2>
          <div className="styleguide-swatches">
            {[
              ["Ink", "#0B1B3B"],
              ["Canvas", "#FAF7F0"],
              ["Primary", "#1F3A8A"],
              ["Accent", "#F5B301"],
              ["Muted", "#4A5470"],
            ].map(([label, value]) => (
              <div className="styleguide-swatch" key={label}>
                <span style={{ backgroundColor: value }} />
                <strong>{label}</strong>
                <code>{value}</code>
              </div>
            ))}
          </div>
        </div>
        <div className="styleguide-section">
          <h2>Buttons</h2>
          <div className="styleguide-buttons">
            <Link className="button button--primary" href="/contact">{copy.navigation.requestDemo}</Link>
            <Link className="button button--secondary" href="/#platforms">{copy.hero.explore}</Link>
          </div>
        </div>
        <div className="styleguide-section">
          <h2>Content and type</h2>
          <div className="styleguide-type">
            <h3>Learning that responds to you.</h3>
            <p>Body copy is designed to stay readable at comfortable line lengths and responsive sizes.</p>
            <p className="eyebrow">Section label</p>
          </div>
        </div>
        <div className="styleguide-section">
          <h2>Content status</h2>
          <p className="styleguide-status">Unapproved content appears with a visible “Needs approval” marker during development and is removed from production.</p>
        </div>
      </div>
    </section>
  );
}
