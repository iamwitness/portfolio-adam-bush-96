"use client";

import { useContext } from "react";
import { WindowManagerContext } from "@/context/WindowManager";

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error("useWindowManager must be used within WindowManagerProvider");
  }
  return ctx;
}
