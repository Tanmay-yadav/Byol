"use client";

import { useSyncExternalStore } from "react";
import { brand, copy } from "@/content/site";

const storageKey = "byol-announcement-dismissed";

function subscribe(callback: () => void) {
  window.addEventListener(storageKey, callback);
  return () => window.removeEventListener(storageKey, callback);
}

function getDismissed() {
  return window.sessionStorage.getItem(storageKey) === "true";
}

export function AnnouncementBar() {
  const dismissed = useSyncExternalStore(subscribe, getDismissed, () => false);

  if (dismissed) return null;

  return (
    <div className="announcement" role="region" aria-label="Announcement">
      <p>
        <span className="announcement__badge">NEW</span>
        {brand.announcement}
        <a href="https://medicoplasma.com" rel="noopener noreferrer">
          {copy.navigation.learnMore}
          <span className="sr-only"> about Medicoplasma</span>
        </a>
      </p>
      <button
        className="announcement__close"
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          window.sessionStorage.setItem(storageKey, "true");
          window.dispatchEvent(new Event(storageKey));
        }}
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
