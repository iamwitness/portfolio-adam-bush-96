"use client";

import React from "react";
import { useWindowManager } from "@/hooks/useWindowManager";

export function MobileToggle() {
  const { toggleDesktopMode, state } = useWindowManager();

  return (
    <button
      className="mobile-toggle"
      onClick={toggleDesktopMode}
      aria-label={state.desktopMode ? "Switch to card view" : "Switch to desktop view"}
    >
      {state.desktopMode ? "📱 Card View" : "🖥️ Desktop Mode"}
    </button>
  );
}
