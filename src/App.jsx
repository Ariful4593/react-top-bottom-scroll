import { useState, useRef } from "react";
import ScrollUpDown from "./index";
import HeadlessWidget from "./demo/HeadlessWidget";
import HeroHeader from "./demo/HeroHeader";
import PlaygroundStudio from "./demo/PlaygroundStudio";
import TerminalShowcase from "./demo/TerminalShowcase";
import ArticleShowcase from "./demo/ArticleShowcase";
import Footer from "./demo/Footer";
import "./index.css";

export default function App() {
  const [mode, setMode] = useState("dynamic");
  const [dualLayout, setDualLayout] = useState("vertical");
  const [dualGap, setDualGap] = useState(8);
  const [position, setPosition] = useState("bottom-right");
  const [showProgress, setShowProgress] = useState(true);
  const [progressColor, setProgressColor] = useState("#6366f1");
  const [autoHide, setAutoHide] = useState(false);
  const [autoHideDelay, setAutoHideDelay] = useState(3000);

  const [showProgressBar, setShowProgressBar] = useState(true);
  const [progressBarPosition, setProgressBarPosition] = useState("top");
  const [progressBarColor, setProgressBarColor] = useState("#6366f1");
  const [progressBarHeight, setProgressBarHeight] = useState(4);

  const [showHeadlessWidget, setShowHeadlessWidget] = useState(true);
  const containerRef = useRef(null);

  const applyPreset = (presetName) => {
    if (presetName === "dynamic") {
      setMode("dynamic");
      setShowProgress(true);
      setProgressColor("#6366f1");
      setShowProgressBar(true);
      setProgressBarPosition("top");
      setProgressBarColor("#6366f1");
      setAutoHide(false);
    } else if (presetName === "dual") {
      setMode("dual");
      setDualLayout("vertical");
      setDualGap(8);
      setShowProgress(true);
      setProgressColor("#a855f7");
      setShowProgressBar(true);
      setProgressBarColor("#a855f7");
      setAutoHide(false);
    } else if (presetName === "article") {
      setMode("up-only");
      setShowProgress(true);
      setProgressColor("#10b981");
      setShowProgressBar(true);
      setProgressBarPosition("top");
      setProgressBarColor("linear-gradient(90deg, #10b981, #06b6d4)");
      setProgressBarHeight(5);
      setAutoHide(true);
      setAutoHideDelay(2500);
    } else if (presetName === "minimal") {
      setMode("up-only");
      setShowProgress(false);
      setShowProgressBar(false);
      setAutoHide(true);
      setAutoHideDelay(3000);
    }
  };

  const getGeneratedCode = () => {
    const codeLines = [];
    if (mode !== "dynamic") codeLines.push(`  mode="${mode}"`);
    if (mode === "dual" && dualLayout !== "vertical") codeLines.push(`  dualLayout="${dualLayout}"`);
    if (mode === "dual" && dualGap !== 8) codeLines.push(`  dualGap={${dualGap}}`);
    if (position !== "bottom-right") codeLines.push(`  position="${position}"`);
    if (showProgress) {
      codeLines.push(`  showProgress={true}`);
      if (progressColor !== "#3b82f6") codeLines.push(`  progressColor="${progressColor}"`);
    }
    if (showProgressBar) {
      codeLines.push(`  showProgressBar={true}`);
      if (progressBarPosition !== "top") codeLines.push(`  progressBarPosition="${progressBarPosition}"`);
      if (progressBarHeight !== 3) codeLines.push(`  progressBarHeight={${progressBarHeight}}`);
      if (progressBarColor !== "#3b82f6") codeLines.push(`  progressBarColor="${progressBarColor}"`);
    }
    if (autoHide) {
      codeLines.push(`  autoHide={true}`);
      if (autoHideDelay !== 3000) codeLines.push(`  autoHideDelay={${autoHideDelay}}`);
    }

    if (codeLines.length === 0) return `<ScrollUpDown />`;
    return `<ScrollUpDown\n${codeLines.join("\n")}\n/>`;
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {showHeadlessWidget && <HeadlessWidget />}

      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
        <HeroHeader />

        <PlaygroundStudio
          mode={mode}
          setMode={setMode}
          dualLayout={dualLayout}
          setDualLayout={setDualLayout}
          position={position}
          setPosition={setPosition}
          showProgress={showProgress}
          setShowProgress={setShowProgress}
          progressColor={progressColor}
          setProgressColor={(c) => {
            setProgressColor(c);
            setProgressBarColor(c);
          }}
          showProgressBar={showProgressBar}
          setShowProgressBar={setShowProgressBar}
          progressBarPosition={progressBarPosition}
          setProgressBarPosition={setProgressBarPosition}
          autoHide={autoHide}
          setAutoHide={setAutoHide}
          showHeadlessWidget={showHeadlessWidget}
          setShowHeadlessWidget={setShowHeadlessWidget}
          applyPreset={applyPreset}
          getGeneratedCode={getGeneratedCode}
        />

        <TerminalShowcase containerRef={containerRef} />
        <ArticleShowcase />
        <Footer />
      </div>

      <ScrollUpDown
        mode={mode}
        dualLayout={dualLayout}
        dualGap={dualGap}
        showProgress={showProgress}
        position={position}
        autoHide={autoHide}
        autoHideDelay={autoHideDelay}
        progressColor={progressColor}
        progressTrackColor="rgba(255, 255, 255, 0.2)"
        progressStrokeWidth={3}
        showProgressBar={showProgressBar}
        progressBarPosition={progressBarPosition}
        progressBarColor={progressBarColor}
        progressBarHeight={progressBarHeight}
      />
    </div>
  );
}
