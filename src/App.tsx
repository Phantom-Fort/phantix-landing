import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Landing from "@/pages/Landing";
import LegalPage from "@/pages/Legal";
import ProductDemo from "@/pages/ProductDemo";
import PlatformCapability from "@/pages/PlatformCapability";
import PricingPage from "@/pages/PricingPage";
import Trust from "@/pages/Trust";
import BusinessLeaders from "@/pages/solutions/BusinessLeaders";
import SecurityTeams from "@/pages/solutions/SecurityTeams";
import Developers from "@/pages/solutions/Developers";
import { SANDBOX_APPLY_URL } from "@/lib/links";

/** Old /sandbox-apply bookmarks → Command Centre public form */
function SandboxApplyRedirect() {
  React.useEffect(() => {
    window.location.replace(SANDBOX_APPLY_URL);
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-slate-400">
      Opening sandbox application…
    </div>
  );
}

/* Cross-page navigation must land at the top — `scroll-behavior: smooth` on
   <html> would otherwise animate the jump, so this forces an instant reset.
   Hash links (/pricing#compare) instead land on the target section: used by
   the landing pricing block's "Compare all plans in detail" link. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      // Let the routed page paint once, then bring its section into view
      // (Section carries scroll-mt-24 so the fixed nav never overlaps it).
      // Retry a few times: async sections above the target (e.g. live pricing
      // tiers) can grow the page after the first attempt and push it down.
      const id = hash.replace(/^#/, "");
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "instant" });
      };
      attempt();
      const timers = [250, 500, 1000, 1600].map((d) => window.setTimeout(attempt, d));
      return () => timers.forEach((t) => window.clearTimeout(t));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* reducedMotion="user" makes every whileInView/entrance animation render
          its final state immediately when the OS asks for reduced motion. */}
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<ProductDemo />} />
          {/* Renamed when the capability moved to cloud provisioning — keep old links alive. */}
          <Route path="/platform/infrastructure" element={<Navigate to="/platform/cloud" replace />} />
          <Route path="/platform/:slug" element={<PlatformCapability />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/solutions/business-leaders" element={<BusinessLeaders />} />
          <Route path="/solutions/security-teams" element={<SecurityTeams />} />
          <Route path="/solutions/developers" element={<Developers />} />
          <Route path="/sandbox-apply" element={<SandboxApplyRedirect />} />
          <Route path="/terms" element={<LegalPage docKey="terms" />} />
          <Route path="/aup" element={<LegalPage docKey="aup" />} />
          <Route path="/privacy" element={<LegalPage docKey="privacy" />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </MotionConfig>
    </BrowserRouter>
  );
}
