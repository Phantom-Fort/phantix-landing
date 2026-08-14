import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import LegalPage from "@/pages/Legal";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/terms" element={<LegalPage docKey="terms" />} />
        <Route path="/aup" element={<LegalPage docKey="aup" />} />
        <Route path="/privacy" element={<LegalPage docKey="privacy" />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
