"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application rendering error", error.digest ?? error.name);
  }, [error]);

  return (
    <section className="not-found">
      <div className="shell not-found__inner">
        <p className="eyebrow">Something didn’t load as expected</p>
        <h1>Let’s try that again.</h1>
        <p>You can retry this page or return to the BYOL Academy homepage.</p>
        <div className="not-found__actions">
          <button className="button button--primary" onClick={() => reset()} type="button">Try again</button>
          <Link className="text-link" href="/">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
