import React, { useState, useRef } from "react";
import ScrollUpDown from "./components/ScrollUpDown";
import "./index.css";

function App() {
  const [showProgress, setShowProgress] = useState(true);
  const [position, setPosition] = useState("bottom-right");
  const [autoHide, setAutoHide] = useState(false);
  const [progressColor, setProgressColor] = useState("#3b82f6");

  const containerRef = useRef(null);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1>react-top-bottom-scroll Demo</h1>
        <p style={{ color: "#64748b" }}>
          Test the new customizable features: Progress ring, positions, auto-hide, and container scroll!
        </p>
      </header>

      {/* Control Panel */}
      <div
        style={{
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
          marginBottom: "2rem",
          display: "grid",
          gap: "1rem",
        }}
      >
        <h3>Interactive Controls</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={showProgress}
              onChange={(e) => setShowProgress(e.target.checked)}
            />
            Show Progress Ring
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={autoHide}
              onChange={(e) => setAutoHide(e.target.checked)}
            />
            Auto-Hide Idle (3s)
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Position:
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={{ padding: "0.4rem 0.8rem", borderRadius: "6px" }}
            >
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
            </select>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Ring Color:
            <input
              type="color"
              value={progressColor}
              onChange={(e) => setProgressColor(e.target.value)}
              style={{ cursor: "pointer", border: "none", width: "32px", height: "32px" }}
            />
          </label>
        </div>
      </div>

      {/* Custom Container Demo */}
      <section style={{ marginBottom: "3rem" }}>
        <h3>Custom Scroll Container Demo (`containerRef`)</h3>
        <div
          ref={containerRef}
          style={{
            height: "200px",
            overflowY: "auto",
            background: "#1e293b",
            color: "#f8fafc",
            padding: "1rem",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <p>Scroll inside this box to see independent scroll button tracking!</p>
          {Array(25)
            .fill(0)
            .map((_, i) => (
              <div key={i} style={{ padding: "0.5rem 0", borderBottom: "1px solid #334155" }}>
                Container Item #{i + 1}
              </div>
            ))}

          <ScrollUpDown
            containerRef={containerRef}
            showProgress={true}
            progressColor="#10b981"
            position="bottom-right"
          />
        </div>
      </section>

      {/* Main Page Scroll Content */}
      <section>
        <h3>Main Window Content</h3>
        {Array(80)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              style={{
                padding: "1rem",
                marginBottom: "0.5rem",
                background: "#ffffff",
                borderRadius: "6px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              Main Page Section #{i + 1} - Scroll down to watch progress ring fill up!
            </div>
          ))}
      </section>

      {/* Main Window Floating Scroll Button */}
      <ScrollUpDown
        showProgress={showProgress}
        position={position}
        autoHide={autoHide}
        progressColor={progressColor}
      />
    </div>
  );
}

export default App;
