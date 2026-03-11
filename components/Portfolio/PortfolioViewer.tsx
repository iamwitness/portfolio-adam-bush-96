"use client";

import React from "react";
import portfolioDataRaw from "@/data/portfolio.json";
import type { PortfolioData } from "@/data/types";

const portfolioData = portfolioDataRaw as PortfolioData;
import { SectionRenderer } from "./SectionRenderer";

interface PortfolioViewerProps {
  contentId: string;
}

export function PortfolioViewer({ contentId }: PortfolioViewerProps) {
  const item = portfolioData.items.find((i) => i.id === contentId);

  if (!item) {
    return (
      <div style={{ padding: 24, fontFamily: "var(--win95-font)" }}>
        <p>Project not found: {contentId}</p>
      </div>
    );
  }

  const { header, sections } = item.content;

  return (
    <div style={{ fontFamily: "var(--win95-font)" }}>
      {/* Header */}
      <div
        style={{
          padding: "24px 24px 16px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          background: "#ffffff",
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--win95-text-disabled)",
            margin: "0 0 6px",
          }}
        >
          {header.subtitle}
        </p>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            margin: "0 0 14px",
            fontFamily: "var(--font-body)",
            color: "var(--win95-text)",
          }}
        >
          {header.title}
        </h1>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {header.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "var(--win95-highlight)",
                color: "var(--win95-highlight-text)",
                padding: "1px 6px",
                fontSize: 10,
                fontFamily: "var(--win95-font)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div style={{ background: "#ffffff" }}>
        {sections.map((section, i) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SectionRenderer key={i} section={section as Record<string, any>} />
        ))}
      </div>
    </div>
  );
}
