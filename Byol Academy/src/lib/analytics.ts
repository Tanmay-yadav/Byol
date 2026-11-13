"use client";

import { track as vercelTrack } from "@vercel/analytics";

type EventProperties = Record<string, string | number | boolean>;

export function trackEvent(
  name: string,
  properties?: EventProperties,
): void {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "true"
  ) {
    return;
  }
  vercelTrack(name, properties);
}
