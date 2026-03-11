"use client";

import React from "react";
import Image from "next/image";

interface ImageSectionProps {
  src: string;
  alt?: string;
  caption?: string;
  hero?: boolean;
}

export function ImageSection({ src, alt = "", caption, hero }: ImageSectionProps) {
  return (
    <div className={hero ? "" : "portfolio-section"} style={{ padding: hero ? 0 : undefined }}>
      <div style={{ position: "relative", width: "100%", minHeight: 200 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="portfolio-hero"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </div>
      {caption && (
        <p
          style={{
            fontFamily: "var(--win95-font)",
            fontSize: "var(--win95-font-size)",
            color: "var(--win95-text-disabled)",
            textAlign: "center",
            padding: "4px 16px",
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
