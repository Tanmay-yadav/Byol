"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function AnalyticsEvents() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "true") return;

    const reportedDepths = new Set<number>();
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-analytics-event]");
      const eventName = element?.dataset.analyticsEvent;
      if (!eventName) return;
      const id = element.dataset.analyticsId;
      const value = element.dataset.analyticsValue;
      const properties = id ? { id } : value ? { [eventName === "audience_select" ? "audience" : "platform"]: value } : undefined;
      trackEvent(eventName, properties);
    }

    function onScroll() {
      const fullHeight = document.documentElement.scrollHeight;
      if (fullHeight <= 0) return;
      const visiblePosition = window.scrollY + window.innerHeight;
      const percentage = Math.min(100, Math.floor((visiblePosition / fullHeight) * 100));
      for (const threshold of [25, 50, 75, 100]) {
        if (percentage >= threshold && !reportedDepths.has(threshold)) {
          reportedDepths.add(threshold);
          trackEvent("scroll_depth", { percent: threshold });
        }
      }
    }

    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
