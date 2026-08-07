import React from "react";
import { useTheme } from "@/lib/theme";
import { cx } from "@/lib/utils";

export function BrandLogo({
  className,
  alt = "Phantix",
  lightSrc = "/logo-transparent.png",
  darkSrc = "/logo-white.png",
}: {
  className?: string;
  alt?: string;
  lightSrc?: string;
  darkSrc?: string;
}) {
  const { theme } = useTheme();
  const src = theme === "dark" ? darkSrc : lightSrc;
  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={cx("object-contain", className)}
    />
  );
}
