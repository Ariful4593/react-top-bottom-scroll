import PropTypes from "prop-types";
import ScrollUpDown from "../index";

const LOG_ENTRIES = [
  { time: "16:20:01", level: "INFO", msg: "Application worker daemon initialized successfully." },
  { time: "16:20:05", level: "INFO", msg: "Connecting to WebSocket cluster [wss://gateway.region-east.internal]..." },
  { time: "16:20:08", level: "SUCCESS", msg: "Connection handshake verified (12ms latency)." },
  { time: "16:20:12", level: "DEBUG", msg: "Passive scroll telemetry subscriber attached to DOM node #containerRef." },
  { time: "16:20:15", level: "INFO", msg: "Reading progress bar listening at position='top', trackColor='rgba(16,185,129,0.1)'." },
  { time: "16:20:20", level: "INFO", msg: "Rendering dual stacked action triggers with autoHide threshold=10px." },
  { time: "16:20:25", level: "DEBUG", msg: "Memory footprint verified at < 1.4KB gzipped bundle size." },
  { time: "16:20:30", level: "INFO", msg: "Running synthetic scroll event benchmarks..." },
  { time: "16:20:35", level: "SUCCESS", msg: "FPS stability tested at constant 60.0 FPS with 0 layout reflows." },
  { time: "16:20:40", level: "DEBUG", msg: "DualLayout computed: horizontal row mode with 8px margin offset." },
  { time: "16:20:45", level: "INFO", msg: "Batch buffer flushing complete (256 operations executed)." },
  { time: "16:20:50", level: "SUCCESS", msg: "All stream pipelines healthy. Scroll to bottom or top to verify." },
];

export default function TerminalShowcase({ containerRef }) {
  return (
    <section style={{ marginBottom: "4rem" }}>
      <div style={{ marginBottom: "1.25rem" }}>
        <span className="pill-badge" style={{ marginBottom: "0.5rem" }}>
          📦 containerRef Isolation
        </span>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0", color: "#ffffff" }}>
          Isolated Container &amp; Modal Scrolling
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", margin: 0 }}>
          Bind the button and reading bar directly to any scrollable <code>&lt;div&gt;</code>, sidebar, drawer, or modal.
        </p>
      </div>

      <div
        className="glass-card"
        style={{
          padding: "1.5rem",
          background: "#080c16",
          border: "1px solid rgba(56, 189, 248, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.75rem" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
          </div>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontFamily: "var(--font-mono)", marginLeft: "0.5rem" }}>
            containerRef • Scrollable Terminal Logs (Dual Mode)
          </span>
        </div>

        <div
          ref={containerRef}
          style={{
            height: "260px",
            overflowY: "auto",
            background: "rgba(0, 0, 0, 0.4)",
            borderRadius: "10px",
            padding: "1.25rem",
            position: "relative",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
          }}
        >
          <div style={{ color: "#38bdf8", marginBottom: "1rem", fontWeight: 600 }}>
            💡 Scroll inside this terminal to test isolated container dual buttons and reading progress bar:
          </div>

          {LOG_ENTRIES.map((log, index) => (
            <div
              key={index}
              style={{
                padding: "0.45rem 0",
                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#64748b" }}>[{log.time}]</span>
              <span
                style={{
                  color:
                    log.level === "SUCCESS"
                      ? "#34d399"
                      : log.level === "DEBUG"
                      ? "#a78bfa"
                      : "#38bdf8",
                  fontWeight: 600,
                }}
              >
                {log.level}
              </span>
              <span style={{ color: "#cbd5e1" }}>{log.msg}</span>
            </div>
          ))}

          <ScrollUpDown
            containerRef={containerRef}
            mode="dual"
            dualLayout="horizontal"
            dualGap={6}
            showProgress={true}
            progressColor="#10b981"
            showProgressBar={true}
            progressBarColor="#10b981"
            position="bottom-right"
          />
        </div>
      </div>
    </section>
  );
}

TerminalShowcase.propTypes = {
  containerRef: PropTypes.shape({ current: PropTypes.any }),
};
