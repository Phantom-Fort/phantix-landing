import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function BackLink({ to = "/", label = "Back to home" }: { to?: string; label?: string }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-200">
      <ArrowLeft size={15} /> {label}
    </Link>
  );
}
