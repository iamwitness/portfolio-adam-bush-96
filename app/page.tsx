"use client";

import React, { useEffect } from "react";
import { useWindowManager } from "@/hooks/useWindowManager";
import { Desktop } from "@/components/Desktop/Desktop";
import { Taskbar } from "@/components/Taskbar/Taskbar";
import { MobileLayout } from "@/components/Mobile/MobileLayout";
import { MobileToggle } from "@/components/Mobile/MobileToggle";
import { BREAKPOINTS } from "@/lib/constants";
import { preloadSounds } from "@/lib/sounds";

export default function Home() {
  const { state, toggleDesktopMode } = useWindowManager();

  // On mount: detect mobile and default to card view
  useEffect(() => {
    const isMobile = window.innerWidth < BREAKPOINTS.mobile;
    if (isMobile && state.desktopMode) {
      toggleDesktopMode();
    }
    preloadSounds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {state.desktopMode ? (
        <>
          <Desktop />
          <Taskbar />
        </>
      ) : (
        <MobileLayout />
      )}
      <MobileToggle />
    </>
  );
}
