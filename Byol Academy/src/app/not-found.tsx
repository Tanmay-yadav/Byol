import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="shell not-found__inner">
        <span className="not-found__code">404</span>
        <p className="eyebrow">That page has wandered off</p>
        <h1>Let’s get you back on track.</h1>
        <p>The page you’re looking for may have moved or no longer exists.</p>
        <div className="not-found__actions">
          <Link className="button button--primary" href="/">Back to home <ArrowLeft size={16} aria-hidden="true" /></Link>
          <Link className="text-link" href="/#platforms">Explore platforms <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
