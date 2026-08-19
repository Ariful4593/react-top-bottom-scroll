import { useState } from "react";

export default function HeroHeader() {
  const [copied, setCopied] = useState(false);

  const copyInstallCommand = () => {
    navigator.clipboard.writeText("npm install react-top-bottom-scroll");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const featureBadges = [
    "⚡ 60fps Passive Listeners",
    "🎯 100% TypeScript",
    "🎣 Headless Hooks",
    "📊 Reading Progress Bar",
    "🔀 4 Scroll Modes",
    "♿ A11y Ready",
  ];

  return (
    <header style={{ textAlign: "center", marginBottom: "3.5rem" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
        <span className="pill-badge">
          ✨ v0.2.0 • Headless Hooks &amp; Reading Bar Included
        </span>
      </div>

      <h1 style={{ fontSize: "3rem", fontWeight: 800, margin: "0 0 1rem", letterSpacing: "-0.03em" }}>
        <span className="gradient-text">react-top-bottom-scroll</span>
      </h1>

      <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: "680px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
        A lightweight, accessible, high-performance scroll companion for React 18 &amp; 19.
        Smooth progress rings, multi-modes, reading bars &amp; headless hooks.
      </p>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={copyInstallCommand}
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#e2e8f0",
            padding: "0.65rem 1.25rem",
            borderRadius: "12px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ color: "var(--accent-cyan)" }}>$</span>
          <span>npm i react-top-bottom-scroll</span>
          <span style={{ color: copied ? "#10b981" : "#94a3b8", fontSize: "0.8rem", marginLeft: "0.5rem" }}>
            {copied ? "✓ Copied!" : "📋"}
          </span>
        </button>

        <a
          href="https://github.com/Ariful4593/react-top-bottom-scroll"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "none",
            color: "#ffffff",
            padding: "0.65rem 1.25rem",
            borderRadius: "12px",
            fontWeight: 600,
            fontSize: "0.9rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 4px 15px var(--primary-glow)",
          }}
        >
          ⭐ GitHub Repository
        </a>
      </div>

      {/* Feature Badges */}
      <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
        {featureBadges.map((feat, i) => (
          <span
            key={i}
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              padding: "0.3rem 0.75rem",
              borderRadius: "8px",
              fontSize: "0.8rem",
              color: "#94a3b8",
            }}
          >
            {feat}
          </span>
        ))}
      </div>
    </header>
  );
}
