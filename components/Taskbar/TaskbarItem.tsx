"use client";

import React from "react";
import Image from "next/image";
import { WindowState } from "@/context/WindowManager";

interface TaskbarItemProps {
  window: WindowState;
  isActive: boolean;
  onClick: () => void;
}

export function TaskbarItem({ window: win, isActive, onClick }: TaskbarItemProps) {
  return (
    <button
      className={`win95-taskbar-item ${isActive ? "active" : ""}`}
      onClick={onClick}
      title={win.title}
    >
      <div style={{ width: 16, height: 16, flexShrink: 0, position: "relative" }}>
        <Image
          src={win.icon}
          alt=""
          fill
          sizes="16px"
          style={{ objectFit: "contain" }}
          unoptimized
        />
      </div>
      <span>{win.title}</span>
    </button>
  );
}
