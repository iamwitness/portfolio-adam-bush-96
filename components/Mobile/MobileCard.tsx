"use client";

import React, { useState } from "react";
import { SectionRenderer } from "@/components/Portfolio/SectionRenderer";

interface MobileCardProps {
  item: {
    id: string;
    title: string;
    content: {
      header: {
        title: string;
        subtitle: string;
        tags: string[];
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sections: Record<string, any>[];
    };
  };
}

export function MobileCard({ item }: MobileCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { header, sections } = item.content;
  const heroSection = sections.find((s) => s.type === "hero-image");

  return (
    <div className="mobile-card">
      {/* Hero image */}
      {heroSection && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroSection.src}
          alt={heroSection.alt ?? item.title}
          className="mobile-card-hero"
        />
      )}

      <div className="mobile-card-body">
        <h2 style={{ fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>
          {header.title}
        </h2>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
          {header.subtitle}
        </p>
        <div style={{ marginBottom: 12 }}>
          {header.tags.map((tag) => (
            <span key={tag} className="mobile-tag">
              {tag}
            </span>
          ))}
        </div>

        {expanded && (
          <div style={{ marginTop: 16 }}>
            {sections
              .filter((s) => s.type !== "hero-image")
              .map((section, i) => (
                <SectionRenderer key={i} section={section} />
              ))}
          </div>
        )}

        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            marginTop: 8,
            background: "#000080",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "8px 16px",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          {expanded ? "Show less ↑" : "View case study ↓"}
        </button>
      </div>
    </div>
  );
}
