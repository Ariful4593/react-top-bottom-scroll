import { useScrollUpDown } from "../index";

export default function HeadlessWidget() {
  const { scrollProgress, scrollDirection, isAtTop, isAtBottom, scrollToTop, scrollToBottom } =
    useScrollUpDown({ showAtThreshold: 20 });

  return (
    <div
      style={{
        position: "fixed",
        top: "1.25rem",
        right: "1.5rem",
        zIndex: 9999,
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        color: "#ffffff",
        padding: "0.45rem 0.9rem",
        borderRadius: "9999px",
        boxShadow: "0 12px 30px -5px rgba(0, 0, 0, 0.4)",
        fontSize: "0.85rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: isAtBottom ? "#ef4444" : isAtTop ? "#64748b" : "#10b981",
            boxShadow: isAtBottom
              ? "0 0 8px #ef4444"
              : isAtTop
              ? "none"
              : "0 0 8px #10b981",
          }}
        />
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>
          {Math.round(scrollProgress)}%
        </span>
        <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
          {scrollDirection ? `(${scrollDirection})` : "(idle)"}
        </span>
      </div>

      <div style={{ display: "flex", gap: "0.3rem" }}>
        <button
          type="button"
          onClick={() => scrollToTop()}
          disabled={isAtTop}
          title="Scroll to Top (Headless Hook)"
          style={{
            background: isAtTop ? "rgba(255,255,255,0.06)" : "#6366f1",
            border: "none",
            color: isAtTop ? "#64748b" : "#ffffff",
            borderRadius: "6px",
            padding: "0.2rem 0.5rem",
            cursor: isAtTop ? "not-allowed" : "pointer",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          ▲ Top
        </button>
        <button
          type="button"
          onClick={() => scrollToBottom()}
          disabled={isAtBottom}
          title="Scroll to Bottom (Headless Hook)"
          style={{
            background: isAtBottom ? "rgba(255,255,255,0.06)" : "#6366f1",
            border: "none",
            color: isAtBottom ? "#64748b" : "#ffffff",
            borderRadius: "6px",
            padding: "0.2rem 0.5rem",
            cursor: isAtBottom ? "not-allowed" : "pointer",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          ▼ Bottom
        </button>
      </div>
    </div>
  );
}
