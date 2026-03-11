"use client";

import React, { useState, useCallback } from "react";

interface GalleryImage {
  src: string;
  caption?: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
}

export function GallerySection({ images }: GallerySectionProps) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length]
  );

  if (images.length === 0) return null;

  const img = images[current];

  return (
    <div className="portfolio-section">
      <div style={{ position: "relative", userSelect: "none" }}>
        {/* Main image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.caption ?? ""}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            cursor: "zoom-in",
            border: "2px inset var(--win95-border-dark)",
          }}
          onClick={() => setLightbox(img.src)}
        />

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              className="win95-btn"
              onClick={prev}
              style={{
                position: "absolute",
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
                padding: "2px 8px",
                fontSize: 14,
                opacity: 0.85,
              }}
              aria-label="Previous image"
            >
              ◀
            </button>
            <button
              className="win95-btn"
              onClick={next}
              style={{
                position: "absolute",
                top: "50%",
                right: 8,
                transform: "translateY(-50%)",
                padding: "2px 8px",
                fontSize: 14,
                opacity: 0.85,
              }}
              aria-label="Next image"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* Caption + dots */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 0",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--win95-font)",
            fontSize: "var(--win95-font-size)",
            color: "var(--win95-text-disabled)",
            flex: 1,
          }}
        >
          {img.caption}
        </span>

        {images.length > 1 && (
          <div style={{ display: "flex", gap: 4 }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: i === current ? "var(--win95-titlebar)" : "var(--win95-border-dark)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="win95-lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="" onClick={(e) => e.stopPropagation()} />
          <button
            className="win95-btn"
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              fontWeight: "bold",
            }}
          >
            Close ✕
          </button>
        </div>
      )}
    </div>
  );
}
