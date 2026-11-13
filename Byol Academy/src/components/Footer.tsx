import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand, copy, platforms } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand brand--footer" href="/" aria-label={`${brand.name} home`}>
              <span className="brand__text">
                <strong>{brand.name}</strong>
                <small>{brand.tagline}</small>
              </span>
            </Link>
            <p>{copy.footer.description}</p>
          </div>
          <div className="footer-column">
            <h2>{copy.footer.platforms}</h2>
            {platforms.map((platform) => (
              <a key={platform.id} href={platform.href} rel="noopener noreferrer">
                {platform.name}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="footer-column">
            <h2>{copy.footer.company}</h2>
            <Link href="/about">About</Link>
            <Link href="/about#research">Research</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-column">
            <h2>{copy.footer.legal}</h2>
            <Link href="/privacy">{copy.legal.privacy}</Link>
            <Link href="/terms">{copy.legal.terms}</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{copy.footer.copyright}</span>
          <span>{brand.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
