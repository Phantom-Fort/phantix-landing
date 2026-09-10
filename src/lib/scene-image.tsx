import React from "react";

/**
 * Product captures ship in both themes — dark is canonical, `-light` variants
 * are captured from the same demo tenant in light mode. If a light capture is
 * missing the img falls back to the dark asset rather than rendering broken.
 */
const SHOT_SIZE: Record<string, { w: number; h: number }> = {
  assets: { w: 1400, h: 1340 },
  vapt: { w: 1400, h: 2390 },
  risks: { w: 1400, h: 1046 },
  compliance: { w: 1400, h: 1000 },
  reports: { w: 1400, h: 994 },
  agent: { w: 1400, h: 1122 },
};

export function sceneImg(
  name: string,
  theme: "dark" | "light",
  alt: string,
  imgClassName = "block w-full",
) {
  const size = SHOT_SIZE[name];
  const suffix = theme === "light" ? "-light" : "";
  return (
    <picture>
      <source srcSet={`/scenes/product-${name}${suffix}.webp`} type="image/webp" />
      <img
        src={`/scenes/product-${name}${suffix}.jpg`}
        alt={alt}
        width={size?.w}
        height={size?.h}
        loading="lazy"
        decoding="async"
        className={imgClassName}
        onError={(e) => {
          if (suffix) e.currentTarget.src = `/scenes/product-${name}.jpg`;
        }}
      />
    </picture>
  );
}
