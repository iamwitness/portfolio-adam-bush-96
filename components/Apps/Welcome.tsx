"use client";

import React from "react";
import { useWindowManager } from "@/hooks/useWindowManager";
import portfolioDataRaw from "@/data/portfolio.json";
import type { PortfolioData } from "@/data/types";

const portfolioData = portfolioDataRaw as PortfolioData;

export function Welcome() {
  const { openWindow } = useWindowManager();

  const openPortfolio = (id: string, title: string, icon: string) => {
    const item = portfolioData.items.find((i) => i.id === id);
    openWindow({
      contentType: "portfolio",
      contentId: id,
      title,
      icon,
      defaultSize: item
        ? { width: item.window.defaultWidth, height: item.window.defaultHeight }
        : { width: 820, height: 620 },
      minSize: item
        ? { width: item.window.minWidth, height: item.window.minHeight }
        : { width: 480, height: 360 },
    });
  };

  const openAbout = () => {
    openWindow({
      contentType: "about",
      title: "About Me",
      icon: "/pro-pic.jpg",
      defaultSize: { width: 680, height: 580 },
      minSize: { width: 400, height: 300 },
    });
  };

  return (
    <div
      style={{
        padding: "32px 36px 28px",
        fontFamily: "var(--font-body)",
        fontSize: 14,
        lineHeight: 1.7,
        background: "var(--win95-window-bg)",
        color: "var(--win95-text)",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {/* Headline */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "var(--win95-text-disabled)",
          marginBottom: 6,
          letterSpacing: "0",
        }}
      >
        Welcome to my portfolio.
      </p>
      <h1
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          marginBottom: 20,
          lineHeight: 1.2,
          color: "var(--win95-text)",
        }}
      >
        I am the designer that builds.
      </h1>

      {/* Flavor text */}
      <p style={{ fontSize: 13, color: "var(--win95-text-disabled)", marginBottom: 6 }}>
        Hopefully this UI brings you back a few years. Unfortunately you cannot
        play Backyard Baseball on it — but you <em>can</em> get the low-down on my
        professional career, to see if we&apos;re a match.
      </p>

      <div
        style={{
          height: 1,
          background: "rgba(0,0,0,0.08)",
          margin: "20px 0",
        }}
      />

      {/* Table of contents label */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--win95-text-disabled)",
          marginBottom: 10,
        }}
      >
        Table of Contents
      </div>

      {/* TOC Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 13,
        }}
      >
        <thead></thead>
        <tbody>
          {/* Portfolio items */}
          {portfolioData.items.map((item, i) => (
            <TOCRow
              key={item.id}
              striped={i % 2 === 0}
              onClick={() => openPortfolio(item.id, item.title, item.icon)}
              name={item.title}
              description={item.content.header.subtitle}
            />
          ))}

          {/* Divider row */}
          <tr>
            <td
              colSpan={2}
              style={{
                padding: "2px 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            />
          </tr>

          {/* About Me */}
          <TOCRow
            striped={false}
            onClick={openAbout}
            name="About Me"
            description="Background, experience, skills & philosophy"
          />
        </tbody>
      </table>

      <p
        style={{
          fontSize: 11,
          color: "var(--win95-text-disabled)",
          marginTop: 20,
          fontStyle: "italic",
        }}
      >
        Double-click any desktop icon to open it directly. Click a row above to jump right in.
      </p>
    </div>
  );
}

function TOCRow({
  name,
  description,
  onClick,
  striped,
}: {
  name: string;
  description: string;
  onClick: () => void;
  striped: boolean;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <tr
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "var(--win95-highlight)"
          : striped
          ? "rgba(0,0,0,0.03)"
          : "transparent",
        color: hovered ? "#fff" : "var(--win95-text)",
        cursor: "pointer",
        transition: "background 0.1s",
      }}
    >
      <td
        style={{
          padding: "7px 12px",
          fontWeight: 600,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </td>
      <td
        style={{
          padding: "7px 12px",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          color: hovered ? "rgba(255,255,255,0.85)" : "var(--win95-text-disabled)",
        }}
      >
        {description}
      </td>
    </tr>
  );
}
