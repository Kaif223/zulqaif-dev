"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: site.location.timeZone,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => formatter.format(Date.now());

// The server can't know the visitor's "now" at build time (and Cache
// Components rejects reading the clock during prerender), so the server
// snapshot is null and the real time fills in after hydration.
const getServerSnapshot = () => null;

export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span>
      <span className="sr-only">Local time in {site.location.city}: </span>
      <span className="tabular-nums">{time ?? "--:--"}</span> {site.location.timeZoneLabel}
    </span>
  );
}
