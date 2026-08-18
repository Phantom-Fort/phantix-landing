import React from "react";
import { motion } from "framer-motion";
import { Section, fadeUp } from "./Section";
import SandboxApplyForm from "./SandboxApplyForm";
import SandboxSeats from "./SandboxSeats";

/**
 * Full sandbox block on the homepage:
 * 1) Seat counter strip
 * 2) Inline apply form (success → thank you, then scroll home)
 */
export default function SandboxSection() {
  return (
    <>
      <SandboxSeats />
      <Section id="sandbox-apply" className="py-16">
        <motion.div {...fadeUp} className="mx-auto max-w-xl">
          <SandboxApplyForm leaveOnSuccess={false} compact />
        </motion.div>
      </Section>
    </>
  );
}
