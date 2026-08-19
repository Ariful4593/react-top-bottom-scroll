import PropTypes from "prop-types";
import PlaygroundControls from "./PlaygroundControls";
import PlaygroundCodePreview from "./PlaygroundCodePreview";

export default function PlaygroundStudio({
  mode,
  setMode,
  dualLayout,
  setDualLayout,
  position,
  setPosition,
  showProgress,
  setShowProgress,
  progressColor,
  setProgressColor,
  showProgressBar,
  setShowProgressBar,
  progressBarPosition,
  setProgressBarPosition,
  autoHide,
  setAutoHide,
  showHeadlessWidget,
  setShowHeadlessWidget,
  applyPreset,
  getGeneratedCode,
}) {
  return (
    <section style={{ marginBottom: "4rem" }}>
      <div className="glass-card" style={{ padding: "2rem" }}>
        
        {/* Header + Presets */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.4rem", margin: 0, fontWeight: 700, color: "#ffffff" }}>
              🎛️ Interactive Playground Studio
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", margin: "0.25rem 0 0" }}>
              Customize the scroll button live and see changes instantly across the entire page.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => applyPreset("dynamic")}
              className={`preset-chip ${mode === "dynamic" ? "active" : ""}`}
            >
              🚀 Smart Dynamic
            </button>
            <button
              type="button"
              onClick={() => applyPreset("dual")}
              className={`preset-chip ${mode === "dual" ? "active" : ""}`}
            >
              🔀 Dual Stack
            </button>
            <button
              type="button"
              onClick={() => applyPreset("article")}
              className={`preset-chip ${mode === "up-only" && showProgressBar ? "active" : ""}`}
            >
              📖 Article Reader
            </button>
            <button
              type="button"
              onClick={() => applyPreset("minimal")}
              className={`preset-chip ${mode === "up-only" && !showProgress ? "active" : ""}`}
            >
              ⚡ Minimal Top
            </button>
          </div>
        </div>

        <PlaygroundControls
          mode={mode}
          setMode={setMode}
          dualLayout={dualLayout}
          setDualLayout={setDualLayout}
          position={position}
          setPosition={setPosition}
          showProgress={showProgress}
          setShowProgress={setShowProgress}
          progressColor={progressColor}
          setProgressColor={setProgressColor}
          showProgressBar={showProgressBar}
          setShowProgressBar={setShowProgressBar}
          progressBarPosition={progressBarPosition}
          setProgressBarPosition={setProgressBarPosition}
          autoHide={autoHide}
          setAutoHide={setAutoHide}
          showHeadlessWidget={showHeadlessWidget}
          setShowHeadlessWidget={setShowHeadlessWidget}
        />

        <PlaygroundCodePreview getGeneratedCode={getGeneratedCode} />
      </div>
    </section>
  );
}

PlaygroundStudio.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  dualLayout: PropTypes.string.isRequired,
  setDualLayout: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  setPosition: PropTypes.func.isRequired,
  showProgress: PropTypes.bool.isRequired,
  setShowProgress: PropTypes.func.isRequired,
  progressColor: PropTypes.string.isRequired,
  setProgressColor: PropTypes.func.isRequired,
  showProgressBar: PropTypes.bool.isRequired,
  setShowProgressBar: PropTypes.func.isRequired,
  progressBarPosition: PropTypes.string.isRequired,
  setProgressBarPosition: PropTypes.func.isRequired,
  autoHide: PropTypes.bool.isRequired,
  setAutoHide: PropTypes.func.isRequired,
  showHeadlessWidget: PropTypes.bool.isRequired,
  setShowHeadlessWidget: PropTypes.func.isRequired,
  applyPreset: PropTypes.func.isRequired,
  getGeneratedCode: PropTypes.func.isRequired,
};
