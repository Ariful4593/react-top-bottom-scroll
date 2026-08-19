import { useState } from "react";
import PropTypes from "prop-types";

export default function PlaygroundCodePreview({ getGeneratedCode }) {
  const [codeCopied, setCodeCopied] = useState(false);

  const copyGeneratedCode = () => {
    navigator.clipboard.writeText(getGeneratedCode());
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#94a3b8" }}>
          Generated Component Code (Live):
        </span>
        <button
          type="button"
          onClick={copyGeneratedCode}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "none",
            color: codeCopied ? "#10b981" : "#cbd5e1",
            borderRadius: "6px",
            padding: "0.3rem 0.75rem",
            fontSize: "0.8rem",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {codeCopied ? "✓ Code Copied!" : "📋 Copy Code"}
        </button>
      </div>
      <div className="code-block">
        <pre style={{ margin: 0 }}><code>{getGeneratedCode()}</code></pre>
      </div>
    </div>
  );
}

PlaygroundCodePreview.propTypes = {
  getGeneratedCode: PropTypes.func.isRequired,
};
