"use client";

import React from "react";
import portfolioDataRaw from "@/data/portfolio.json";
import type { PortfolioData } from "@/data/types";
import siteConfig from "@/site.config";

const portfolioData = portfolioDataRaw as PortfolioData;
import { MobileCard } from "./MobileCard";

export function MobileLayout() {
  return (
    <div className="mobile-layout">
      {/* Header */}
      <div className="mobile-header">
        <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 4 }}>
          {siteConfig.name}
        </h1>
        <p style={{ fontSize: 15, opacity: 0.8, marginBottom: 20 }}>
          {siteConfig.title} · {siteConfig.location}
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", fontSize: 13, opacity: 0.8 }}
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", fontSize: 13, opacity: 0.8 }}
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", fontSize: 13, opacity: 0.8 }}
          >
            Resume
          </a>
        </div>
      </div>

      {/* Portfolio cards */}
      <div style={{ paddingBottom: 80 }}>
        {portfolioData.items.map((item) => (
          <MobileCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
