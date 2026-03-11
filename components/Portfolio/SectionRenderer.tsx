"use client";

import React from "react";
import { ImageSection } from "./ImageSection";
import { VideoSection } from "./VideoSection";
import { GallerySection } from "./GallerySection";
import { TextSection } from "./TextSection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SectionRenderer({ section }: { section: Record<string, any> }) {
  switch (section.type) {
    case "hero-image":
      return <ImageSection src={section.src} alt={section.alt} hero />;

    case "image":
      return (
        <ImageSection src={section.src} alt={section.alt} caption={section.caption} />
      );

    case "text":
      return <TextSection heading={section.heading} body={section.body} />;

    case "video":
      return (
        <VideoSection
          src={section.src}
          poster={section.poster}
          caption={section.caption}
        />
      );

    case "gallery":
      return <GallerySection images={section.images ?? []} />;

    case "stats":
      return (
        <div className="portfolio-section">
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {(section.items ?? []).map(
              (stat: { label: string; value: string }, i: number) => (
                <div
                  key={i}
                  className="win95-inset"
                  style={{
                    padding: "8px 16px",
                    textAlign: "center",
                    flex: "1 1 100px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--win95-font)",
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "var(--win95-titlebar)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--win95-font)",
                      fontSize: "var(--win95-font-size)",
                      color: "var(--win95-text-disabled)",
                      marginTop: 2,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      );

    case "link-group":
      return (
        <div className="portfolio-section">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(section.links ?? []).map(
              (link: { label: string; url: string }, i: number) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="win95-btn"
                  style={{ textDecoration: "none" }}
                >
                  {link.label} ↗
                </a>
              )
            )}
          </div>
        </div>
      );

    case "youtube": {
      const embedUrl = `https://www.youtube.com/embed/${section.videoId}`;
      return (
        <div className="portfolio-section">
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
            <iframe
              src={embedUrl}
              title={section.caption ?? "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "2px inset var(--win95-border-dark)",
              }}
            />
          </div>
          {section.caption && (
            <p
              style={{
                fontFamily: "var(--win95-font)",
                fontSize: "var(--win95-font-size)",
                color: "var(--win95-text-disabled)",
                textAlign: "center",
                marginTop: 6,
              }}
            >
              {section.caption}
            </p>
          )}
        </div>
      );
    }

    default:
      return null;
  }
}
