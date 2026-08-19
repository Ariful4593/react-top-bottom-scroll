import PropTypes from "prop-types";

export default function PlaygroundControls({
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
}) {
  return (
    <>
      {/* Form Controls Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
            Scroll Mode:
          </label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="custom-select">
            <option value="dynamic">Dynamic (Auto Switch)</option>
            <option value="dual">Dual (Both Up &amp; Down)</option>
            <option value="up-only">Up Only (Classic Top)</option>
            <option value="down-only">Down Only (Scroll to Bottom)</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
            Button Position:
          </label>
          <select value={position} onChange={(e) => setPosition(e.target.value)} className="custom-select">
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-center">Bottom Center</option>
          </select>
        </div>

        {mode === "dual" ? (
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
              Dual Button Layout:
            </label>
            <select value={dualLayout} onChange={(e) => setDualLayout(e.target.value)} className="custom-select">
              <option value="vertical">Vertical Stack</option>
              <option value="horizontal">Horizontal Row</option>
            </select>
          </div>
        ) : (
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
              Progress Bar Position:
            </label>
            <select value={progressBarPosition} onChange={(e) => setProgressBarPosition(e.target.value)} className="custom-select">
              <option value="top">Top of Viewport</option>
              <option value="bottom">Bottom of Viewport</option>
            </select>
          </div>
        )}

        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.4rem" }}>
            Ring &amp; Bar Color:
          </label>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              type="color"
              value={progressColor}
              onChange={(e) => setProgressColor(e.target.value)}
              style={{ cursor: "pointer", border: "none", width: "40px", height: "40px", borderRadius: "8px", background: "none" }}
            />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "#94a3b8" }}>
              {progressColor}
            </span>
          </div>
        </div>
      </div>

      {/* Toggles Row */}
      <div style={{ background: "rgba(0,0,0,0.25)", padding: "1.25rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1.5rem" }}>
        <label className="custom-checkbox-label">
          <input type="checkbox" className="custom-checkbox" checked={showProgressBar} onChange={(e) => setShowProgressBar(e.target.checked)} />
          Horizontal Reading Bar
        </label>
        <label className="custom-checkbox-label">
          <input type="checkbox" className="custom-checkbox" checked={showProgress} onChange={(e) => setShowProgress(e.target.checked)} />
          Circular Progress Ring
        </label>
        <label className="custom-checkbox-label">
          <input type="checkbox" className="custom-checkbox" checked={autoHide} onChange={(e) => setAutoHide(e.target.checked)} />
          Auto-Hide on Inactivity
        </label>
        <label className="custom-checkbox-label">
          <input type="checkbox" className="custom-checkbox" checked={showHeadlessWidget} onChange={(e) => setShowHeadlessWidget(e.target.checked)} />
          Headless Hook Live Widget
        </label>
      </div>
    </>
  );
}

PlaygroundControls.propTypes = {
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
};
