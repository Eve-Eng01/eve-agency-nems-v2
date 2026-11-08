"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { site } from "@/content/site";

/* The 30 minute call, booked inline through Cal.com. Settings as given by the studio's Cal account. */
export function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": "#6701f2" }, dark: { "cal-brand": "#6701f2" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <div className="contact__cal">
      <p className="contact__calwait" aria-hidden="true">Loading available times…</p>
      <Cal
        namespace="30min"
        calLink={site.calLink}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" }}
      />
    </div>
  );
}
