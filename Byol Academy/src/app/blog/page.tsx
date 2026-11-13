import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { copy } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and ideas on adaptive learning from BYOL Academy.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <section className="page-hero page-hero--blog">
      <div className="shell page-hero__inner">
        <p className="eyebrow">{copy.blog.eyebrow}</p>
        <h1>{copy.blog.title}</h1>
        <p>{copy.blog.description}</p>
        <div className="blog-empty">
          <span className="blog-empty__icon" aria-hidden="true">✳</span>
          <p>{copy.blog.empty}</p>
          <Link className="text-link" href="/about#research">Explore our research directions <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
