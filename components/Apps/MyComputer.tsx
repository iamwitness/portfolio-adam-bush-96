"use client";

import React from "react";
import siteConfig from "@/site.config";

const DRIVES = [
  { icon: "💾", label: "3½ Floppy (A:)", free: "1.41 MB free", total: "1.44 MB" },
  { icon: "💿", label: "Portfolio (C:)", free: "2.1 GB free", total: "3.2 GB" },
  { icon: "📀", label: "Projects (D:)", free: "420 MB free", total: "650 MB" },
];

const SPECS = [
  { label: "Processor", value: "Intel Pentium 233 MHz" },
  { label: "Memory", value: "64 MB RAM" },
  { label: "OS", value: `${siteConfig.osName} ${siteConfig.osVersion}` },
  { label: "Display", value: "1024×768, 16-bit color" },
  { label: "Sound Card", value: "Creative Sound Blaster 16" },
  { label: "CD-ROM", value: "4× Speed" },
];

export function MyComputer() {
  return (
    <div style={{ background: "var(--win95-window-bg)", height: "100%" }}>
      {/* Drives section */}
      <div style={{ padding: 16 }}>
        <div
          style={{
            fontFamily: "var(--win95-font)",
            fontSize: "var(--win95-font-size)",
            fontWeight: "bold",
            marginBottom: 8,
            paddingBottom: 4,
            borderBottom: "1px solid var(--win95-border-dark)",
          }}
        >
          Disk Drives
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", padding: "8px 0" }}>
          {DRIVES.map((drive) => (
            <div
              key={drive.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                width: 80,
                padding: 8,
                cursor: "default",
                fontFamily: "var(--win95-font)",
                fontSize: "var(--win95-font-size)",
                textAlign: "center",
              }}
              title={`${drive.free} of ${drive.total}`}
            >
              <span style={{ fontSize: 32 }}>{drive.icon}</span>
              <span style={{ wordBreak: "break-word" }}>{drive.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System info */}
      <div
        style={{
          margin: "0 16px 16px",
          padding: 12,
          background: "var(--win95-chrome)",
          border: "2px solid",
          borderColor:
            "var(--win95-border-dark) var(--win95-border-light) var(--win95-border-light) var(--win95-border-dark)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--win95-font)",
            fontSize: "var(--win95-font-size)",
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          System Properties
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "4px 16px",
            fontFamily: "var(--win95-font)",
            fontSize: "var(--win95-font-size)",
          }}
        >
          {SPECS.map(({ label, value }) => (
            <React.Fragment key={label}>
              <span style={{ color: "var(--win95-text-disabled)", whiteSpace: "nowrap" }}>
                {label}:
              </span>
              <span>{value}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "8px 16px",
          fontFamily: "var(--win95-font)",
          fontSize: "var(--win95-font-size)",
          color: "var(--win95-text-disabled)",
          borderTop: "1px solid var(--win95-border-dark)",
        }}
      >
        Registered to: {siteConfig.name} · {siteConfig.title}, {siteConfig.location}
      </div>
    </div>
  );
}
