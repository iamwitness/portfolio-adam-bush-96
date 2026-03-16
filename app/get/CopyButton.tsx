"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select a hidden textarea
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="win95-btn"
      style={{ fontSize: 11, padding: "3px 10px", minHeight: 24 }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
