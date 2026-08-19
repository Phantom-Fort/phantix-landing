import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "@/pages/Landing";
import LegalPage from "@/pages/Legal";
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sandbox-apply" element={<SandboxApplyRedirect />} />
        <Route path="/terms" element={<LegalPage docKey="terms" />} />
        <Route path="/aup" element={<LegalPage docKey="aup" />} />
        <Route path="/privacy" element={<LegalPage docKey="privacy" />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
