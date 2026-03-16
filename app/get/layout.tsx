import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";

// Isolated layout — no WindowManagerProvider, no Desktop/Taskbar chrome.
// Must define its own <html>/<body> to opt out of the root layout tree.

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AdamOS — Get the App",
  description:
    "Open AdamOS in your browser or run it locally via the CLI. Windows 95-style portfolio by Adam Bush.",
};

export default function GetLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
