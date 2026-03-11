"use client";

import React from "react";

interface TextSectionProps {
  heading?: string;
  body: string;
}

export function TextSection({ heading, body }: TextSectionProps) {
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <div className="portfolio-section">
      {heading && (
        <h2
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 12,
            color: "var(--win95-text)",
            letterSpacing: "-0.01em",
          }}
        >
          {heading}
        </h2>
      )}
      {paragraphs.map((p, i) => (
        <p key={i} className="portfolio-text" style={{ marginBottom: i < paragraphs.length - 1 ? 12 : 0 }}>
          {p.trim()}
        </p>
      ))}
    </div>
  );
}
