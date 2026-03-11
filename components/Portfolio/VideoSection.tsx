"use client";

import React from "react";

interface VideoSectionProps {
  src: string;
  poster?: string;
  caption?: string;
}

export function VideoSection({ src, poster, caption }: VideoSectionProps) {
  return (
    <div className="portfolio-section">
      <video
        controls
        src={src}
        poster={poster}
        style={{
          width: "100%",
          display: "block",
          background: "#000",
          maxHeight: 400,
        }}
        preload="metadata"
      />
      {caption && (
        <p
          style={{
            fontFamily: "var(--win95-font)",
            fontSize: "var(--win95-font-size)",
            color: "var(--win95-text-disabled)",
            textAlign: "center",
            marginTop: 4,
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
