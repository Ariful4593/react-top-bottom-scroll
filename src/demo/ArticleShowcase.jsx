const BENCHMARKS = [
  { f: "Dual Up & Down Modes", us: "✅ 4 Modes (Dynamic, Dual, Up, Down)", other: "❌ Up only" },
  { f: "Circular SVG Progress Ring", us: "✅ Built-in 0–100%", other: "❌ None" },
  { f: "Top/Bottom Reading Progress Bar", us: "✅ Built-in with gradients", other: "❌ Requires separate pkg" },
  { f: "Headless React Hooks", us: "✅ useScrollUpDown & useScrollProgress", other: "❌ Component only" },
  { f: "Custom Container Support", us: "✅ containerRef for modals/drawers", other: "⚠️ Window only" },
  { f: "Bundle Size", us: "⚡ < 3KB gzipped", other: "5KB - 15KB" },
];

export default function ArticleShowcase() {
  return (
    <section>
      <div style={{ marginBottom: "2rem" }}>
        <span className="pill-badge" style={{ marginBottom: "0.5rem" }}>
          📄 Long-Form Content Demo
        </span>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0", color: "#ffffff" }}>
          Main Window Interactive Article
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", margin: 0 }}>
          Scroll down through this rich technical article to observe full-page reading progress and directional action triggers.
        </p>
      </div>

      <div className="glass-card" style={{ padding: "2.5rem" }}>
        <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span className="pill-badge" style={{ background: "rgba(6, 182, 212, 0.12)", color: "#38bdf8", borderColor: "rgba(6, 182, 212, 0.25)" }}>
              React Architecture
            </span>
            <span className="pill-badge" style={{ background: "rgba(168, 85, 247, 0.12)", color: "#c084fc", borderColor: "rgba(168, 85, 247, 0.25)" }}>
              Performance
            </span>
          </div>

          <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 1rem", lineHeight: 1.3, color: "#ffffff" }}>
            Architecting High-Performance Scroll Observability in Modern React Applications
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
            <span>✍️ By Ariful Islam</span>
            <span>•</span>
            <span>⏱️ 5 min read</span>
            <span>•</span>
            <span>🔄 Updated for React 18 &amp; 19</span>
          </div>
        </div>

        <article style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.8 }}>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginTop: "2rem" }}>
            1. The Challenge with Native Scroll Handlers
          </h3>
          <p>
            In client-side web applications, managing scroll buttons and progress bars often causes layout thrashing when unoptimized event handlers force synchronous geometry calculations on rapid scrolling.
          </p>

          <div style={{ background: "rgba(99, 102, 241, 0.08)", borderLeft: "4px solid var(--primary)", padding: "1.25rem 1.5rem", borderRadius: "0 12px 12px 0", margin: "2rem 0", color: "#e2e8f0" }}>
            <p style={{ margin: 0, fontStyle: "italic", fontWeight: 500 }}>
              &ldquo;By utilizing passive event listeners and delta calculations, <code>react-top-bottom-scroll</code> maintains smooth 60 FPS transitions without thread jank.&rdquo;
            </p>
          </div>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginTop: "2.5rem" }}>
            2. How Passive Event Listeners Guarantee 60 FPS
          </h3>
          <div className="code-block" style={{ margin: "1.5rem 0" }}>
            <span className="code-comment">{"// Passive event registration ensures zero cancellation delays"}</span><br />
            <span className="code-keyword">target</span>.addEventListener(<span className="code-string">&quot;scroll&quot;</span>, handleScroll, &#123; <span className="code-prop">passive:</span> <span className="code-keyword">true</span> &#125;);
          </div>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginTop: "2.5rem" }}>
            3. Headless React Hook: Total Design Freedom
          </h3>
          <div className="code-block" style={{ margin: "1.5rem 0" }}>
            <span className="code-keyword">import</span> &#123; useScrollUpDown &#125; <span className="code-keyword">from</span> <span className="code-string">&quot;react-top-bottom-scroll&quot;</span>;<br /><br />
            <span className="code-keyword">const</span> &#123; scrollProgress, isAtTop, scrollToTop &#125; = <span className="code-component">useScrollUpDown</span>();
          </div>

          <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", marginTop: "2.5rem" }}>
            4. Feature Comparison Benchmark
          </h3>
          <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem 1rem", color: "#f8fafc" }}>Feature</th>
                  <th style={{ padding: "0.75rem 1rem", color: "#38bdf8" }}>react-top-bottom-scroll</th>
                  <th style={{ padding: "0.75rem 1rem", color: "#94a3b8" }}>Standard Top Buttons</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARKS.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "#cbd5e1" }}>{row.f}</td>
                    <td style={{ padding: "0.75rem 1rem", color: "#34d399", fontWeight: 500 }}>{row.us}</td>
                    <td style={{ padding: "0.75rem 1rem", color: "#94a3b8" }}>{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "2.5rem", padding: "1.5rem", borderRadius: "14px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", textAlign: "center" }}>
            <h4 style={{ margin: "0 0 0.5rem", color: "#ffffff", fontSize: "1.1rem" }}>
              🎉 You reached the end of the article!
            </h4>
            <p style={{ margin: "0 0 1rem", color: "#94a3b8", fontSize: "0.9rem" }}>
              Notice how the floating scroll button automatically switched direction to <strong>&ldquo;Scroll to top&rdquo;</strong>.
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ background: "var(--primary)", border: "none", color: "#ffffff", padding: "0.6rem 1.25rem", borderRadius: "8px", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 12px var(--primary-glow)" }}
            >
              ▲ Back to Top
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
