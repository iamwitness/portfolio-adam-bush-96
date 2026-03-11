"use client";

import React, { useCallback, useEffect } from "react";
import { useWindowManager } from "@/hooks/useWindowManager";
import { IconGrid } from "./IconGrid";
import { DesktopIcon } from "./DesktopIcon";
import { AppWindow } from "@/components/Window/AppWindow";
import { DesktopIconConfig } from "./DesktopIcon";
import portfolioDataRaw from "@/data/portfolio.json";
import type { PortfolioData } from "@/data/types";

const portfolioData = portfolioDataRaw as PortfolioData;

// Build icons from portfolio data + built-in apps
const BUILTIN_ICONS: DesktopIconConfig[] = [
  {
    id: "about-me",
    label: "About Me",
    icon: "/pro-pic.jpg",
    contentType: "about",
    defaultSize: { width: 680, height: 580 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: "contact",
    label: "Contact",
    icon: "/icons/folder.webp",
    contentType: "contact",
  },
  {
    id: "my-computer",
    label: "My Computer",
    icon: "/icons/my-computer.webp",
    contentType: "my-computer",
  },
  {
    id: "recycle-bin",
    label: "Recycle Bin",
    icon: "/icons/recycle-bin.webp",
    contentType: "recycle-bin",
  },
];

const PORTFOLIO_ICONS: DesktopIconConfig[] = portfolioData.items.map((item) => ({
  id: item.id,
  label: item.title,
  icon: item.icon,
  contentType: "portfolio" as const,
  contentId: item.id,
  defaultSize: {
    width: item.window.defaultWidth,
    height: item.window.defaultHeight,
  },
  minSize: {
    width: item.window.minWidth,
    height: item.window.minHeight,
  },
}));


const WELCOME_ICON: DesktopIconConfig = {
  id: "welcome",
  label: "Welcome",
  icon: "/icons/welcome.webp",
  contentType: "welcome",
  defaultSize: { width: 560, height: 460 },
  minSize: { width: 400, height: 320 },
};

export function Desktop() {
  const { state, selectIcon, openWindow } = useWindowManager();

  // Auto-open welcome window on first render
  useEffect(() => {
    openWindow({
      contentType: "welcome",
      title: "Welcome",
      icon: "/icons/welcome.webp",
      defaultSize: { width: 560, height: 460 },
      minSize: { width: 400, height: 320 },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDesktopClick = useCallback(
    (e: React.MouseEvent) => {
      // Deselect icons when clicking bare desktop
      if (e.target === e.currentTarget) {
        selectIcon(null);
      }
    },
    [selectIcon]
  );

  return (
    <div
      onClick={handleDesktopClick}
      style={{
        position: "fixed",
        inset: 0,
        bottom: "var(--taskbar-height)",
        backgroundImage: "url(/wallpaper.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundColor: "var(--win95-bg)",
        overflow: "hidden",
        imageRendering: "pixelated",
      }}
    >
      {/* Built-in icons — top left */}
      <IconGrid icons={BUILTIN_ICONS} align="left" />

      {/* Portfolio icons — top right */}
      <IconGrid icons={PORTFOLIO_ICONS} align="right" />

      {/* Welcome icon — bottom left */}
      <div style={{ position: "absolute", bottom: 8, left: 8 }}>
        <DesktopIcon config={WELCOME_ICON} />
      </div>

      {/* Open windows */}
      {state.windows.map((win) => (
        <AppWindow key={win.id} window={win} />
      ))}
    </div>
  );
}
