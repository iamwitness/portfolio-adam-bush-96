"use client";

import React from "react";
import { ResizeDirection } from "@/hooks/useResizable";

const DIRECTIONS: ResizeDirection[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

interface ResizeHandlesProps {
  onResizeStart: (
    e: React.PointerEvent<HTMLElement>,
    direction: ResizeDirection
  ) => void;
  onResizeMove: (e: React.PointerEvent<HTMLElement>) => void;
  onResizeEnd: (e: React.PointerEvent<HTMLElement>) => void;
}

export function ResizeHandles({
  onResizeStart,
  onResizeMove,
  onResizeEnd,
}: ResizeHandlesProps) {
  return (
    <>
      {DIRECTIONS.map((dir) => (
        <div
          key={dir}
          className={`resize-handle resize-handle-${dir}`}
          onPointerDown={(e) => onResizeStart(e, dir)}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeEnd}
        />
      ))}
    </>
  );
}
