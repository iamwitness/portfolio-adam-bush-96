import CopyButton from "./CopyButton";

const LIVE_URL = "https://adam-bush.vercel.app/";

const COMMANDS = {
  npxMac: "npx adam-os",
  npxWin: "npx adam-os",
  installMac:
    "curl -fsSL https://raw.githubusercontent.com/iamwitness/portfolio-adam-bush-96/main/install.sh | bash",
  installWin:
    "irm https://raw.githubusercontent.com/iamwitness/portfolio-adam-bush-96/main/install.ps1 | iex",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function CodeBlock({
  label,
  icon,
  command,
}: {
  label: string;
  icon: string;
  command: string;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 4,
          fontSize: 11,
          color: "var(--win95-text-disabled)",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        <span>{icon}</span>
        {label}
      </div>
      <div
        className="win95-inset"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "8px 10px",
          background: "#1a1a1a",
          borderColor: "#555",
        }}
      >
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "#d4f5a0",
            wordBreak: "break-all",
            flex: 1,
          }}
        >
          {command}
        </code>
        <CopyButton text={command} />
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: "var(--win95-text)",
        marginBottom: 8,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--win95-border-dark)",
        margin: "14px 0",
        opacity: 0.4,
      }}
    />
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GetPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--win95-bg)",
        padding: "16px",
        overflow: "auto",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          background: "var(--win95-chrome)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-window)",
          width: "100%",
          maxWidth: 860,
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div className="win95-titlebar">
          <span style={{ fontSize: 16, lineHeight: 1 }}>🖥</span>
          <span className="win95-titlebar-title">
            AdamOS — Choose Your Experience
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 20px 16px" }}>
          <p
            style={{
              fontSize: "var(--font-size-sm)",
              marginBottom: 16,
              color: "var(--win95-text-disabled)",
            }}
          >
            How would you like to run AdamOS?
          </p>

          {/* Two-panel layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
            className="get-panels"
          >
            {/* ── Left: Open in Browser ── */}
            <div
              className="win95-raised"
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                background: "var(--win95-window-bg)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 24 }}>🌐</span>
                <div>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: "var(--font-size-base)",
                    }}
                  >
                    Open in Browser
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--win95-text-disabled)",
                      marginTop: 2,
                    }}
                  >
                    No install required
                  </p>
                </div>
              </div>

              <p
                style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--win95-text)",
                  lineHeight: 1.5,
                }}
              >
                The full Win95 desktop experience, live in your browser.
                Nothing to install.
              </p>

              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="win95-btn"
                style={{
                  marginTop: "auto",
                  textDecoration: "none",
                  background: "var(--win95-highlight)",
                  color: "var(--win95-highlight-text)",
                  fontWeight: 600,
                  fontSize: "var(--font-size-sm)",
                  padding: "8px 20px",
                  justifyContent: "center",
                }}
              >
                Launch AdamOS →
              </a>
            </div>

            {/* ── Right: Run Locally ── */}
            <div
              className="win95-raised"
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                background: "var(--win95-window-bg)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>💻</span>
                <div>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: "var(--font-size-base)",
                    }}
                  >
                    Run Locally
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--win95-text-disabled)",
                      marginTop: 2,
                    }}
                  >
                    Runs on your machine
                  </p>
                </div>
              </div>

              {/* Section A: Have Node.js */}
              <SectionLabel>
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#4caf50",
                    flexShrink: 0,
                  }}
                />
                Have Node.js ≥ 18? Run directly:
              </SectionLabel>

              <CodeBlock label="macOS · Terminal" icon="🍎" command={COMMANDS.npxMac} />
              <CodeBlock label="Windows · PowerShell" icon="🪟" command={COMMANDS.npxWin} />

              <Divider />

              {/* Section B: Full installer */}
              <SectionLabel>
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#ff9800",
                    flexShrink: 0,
                  }}
                />
                Don&apos;t have Node.js? Full install:
              </SectionLabel>

              <CodeBlock
                label="macOS · Terminal"
                icon="🍎"
                command={COMMANDS.installMac}
              />
              <CodeBlock
                label="Windows · PowerShell"
                icon="🪟"
                command={COMMANDS.installWin}
              />
            </div>
          </div>

          {/* Footer */}
          <p
            style={{
              fontSize: 11,
              color: "var(--win95-text-disabled)",
              marginTop: 12,
              textAlign: "center",
            }}
          >
            CLI mode requires Node.js ≥ 18 · The full installer handles
            everything automatically.
          </p>
        </div>
      </div>

      {/* Responsive: stack panels on small screens */}
      <style>{`
        @media (max-width: 600px) {
          .get-panels {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
