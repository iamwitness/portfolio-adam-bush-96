"use client";

import React from "react";
import { DesktopIcon, DesktopIconConfig } from "./DesktopIcon";

interface IconGridProps {
  icons: DesktopIconConfig[];
  align?: "left" | "right";
}

export function IconGrid({ icons, align = "left" }: IconGridProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        ...(align === "right" ? { right: 0 } : { left: 0 }),
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateRows: "repeat(auto-fill, 96px)",
        gridAutoColumns: "96px",
        alignContent: "start",
        gap: 4,
        padding: 12,
        maxHeight: "100%",
        alignItems: "start",
      }}
    >
      {icons.map((icon) => (
        <DesktopIcon key={icon.id} config={icon} />
      ))}
    </div>
  );
}
