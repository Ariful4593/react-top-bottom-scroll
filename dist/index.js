import "./index.css";
import { jsxs as x, Fragment as eo, jsx as c } from "react/jsx-runtime";
import { useState as d, useRef as ro, useCallback as no, useEffect as fo } from "react";
const co = (u = {}) => {
  const {
    bottomRef: i = null,
    topRef: f = null,
    containerRef: t = null,
    showAtThreshold: m = 10,
    smoothScroll: b = !0,
    autoHide: E = !1,
    autoHideDelay: k = 3e3,
    onScrollToTop: p,
    onScrollToBottom: h,
    onScrollChange: y
  } = u, [a, v] = d(null), [Y, _] = d(0), [L, z] = d(0), [U, R] = d(0), [j, B] = d(!0), [D, F] = d(!1), [O, W] = d(!1), [A, I] = d(!1), s = ro(0), w = ro(null), M = (e) => typeof e == "boolean" ? e ? "smooth" : "auto" : b ? "smooth" : "auto", q = no(
    (e) => {
      const l = M(e), r = i?.current, o = t?.current;
      r ? r.scrollIntoView({
        behavior: l,
        block: "end",
        inline: "nearest"
      }) : o ? o.scrollTo({
        top: o.scrollHeight,
        behavior: l
      }) : typeof window < "u" && window.scrollTo({
        top: document.documentElement.scrollHeight || document.body.scrollHeight,
        behavior: l
      }), h && h();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i, t, b, h]
  ), P = no(
    (e) => {
      const l = M(e), r = f?.current, o = t?.current;
      r ? r.scrollIntoView({
        behavior: l,
        block: "start",
        inline: "nearest"
      }) : o ? o.scrollTo({
        top: 0,
        behavior: l
      }) : typeof window < "u" && window.scrollTo({
        top: 0,
        behavior: l
      }), p && p();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f, t, b, p]
  );
  return fo(() => {
    const e = () => {
      const r = t?.current;
      let o = 0, S = 0, g = 0;
      r ? (o = r.scrollTop, S = r.scrollHeight, g = r.clientHeight) : typeof window < "u" && (o = window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0, S = Math.max(
        document.body?.scrollHeight || 0,
        document.documentElement?.scrollHeight || 0
      ), g = window.innerHeight || document.documentElement?.clientHeight || 0);
      const H = s.current;
      let n = a;
      o > H && o > m ? n = "down" : o < H && o > 0 ? n = "up" : o === 0 && (n = null), n !== a && v(n);
      const C = Math.max(0, S - g), T = C > 0 ? Math.min(100, Math.max(0, o / C * 100)) : 0, J = o < m, N = C > 0 && o + g >= S - 20;
      z(o), R(C), _(T), B(J), F(N), W(!N && o >= m), s.current = o, y && y(n, Math.round(T)), E && (I(!1), w.current && clearTimeout(w.current), w.current = setTimeout(() => {
        I(!0);
      }, k));
    }, l = t?.current || (typeof window < "u" ? window : null);
    return l && (l.addEventListener("scroll", e, { passive: !0 }), e()), () => {
      l && l.removeEventListener("scroll", e), w.current && clearTimeout(w.current);
    };
  }, [
    t,
    m,
    E,
    k,
    a,
    y
  ]), {
    scrollDirection: a,
    scrollProgress: Y,
    currentScrollY: L,
    maxScrollable: U,
    isAtTop: j,
    isAtBottom: D,
    isVisible: O,
    isIdle: A,
    scrollToTop: P,
    scrollToBottom: q
  };
}, ho = (u = null) => {
  const { scrollProgress: i, currentScrollY: f, maxScrollable: t } = co({
    containerRef: u
  });
  return {
    scrollProgress: i,
    currentScrollY: f,
    maxScrollable: t
  };
}, Z = 18, Q = 2 * Math.PI * Z, X = ({ direction: u, color: i }) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    height: "16",
    width: "12",
    viewBox: "0 0 384 512",
    fill: i,
    style: u === "down" ? { transform: "rotate(180deg)" } : void 0,
    "aria-hidden": "true",
    children: /* @__PURE__ */ c("path", { d: "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" })
  }
), wo = ({
  bottomRef: u = null,
  topRef: i = null,
  containerRef: f = null,
  mode: t = "dynamic",
  dualLayout: m = "vertical",
  dualGap: b = 8,
  upIconColor: E = "white",
  downIconColor: k = "white",
  upTitleMessage: p = "Scroll to top",
  downTitleMessage: h = "Scroll to bottom",
  style: y = {},
  className: a = "",
  position: v = "bottom-right",
  showAtThreshold: Y = 10,
  smoothScroll: _ = !0,
  showProgress: L = !1,
  progressColor: z = "#3b82f6",
  progressTrackColor: U = "rgba(255, 255, 255, 0.2)",
  progressStrokeWidth: R = 3,
  showProgressBar: j = !1,
  progressBarPosition: B = "top",
  progressBarHeight: D = 3,
  progressBarColor: F = "#3b82f6",
  progressBarTrackColor: O = "transparent",
  progressBarZIndex: W = 10002,
  autoHide: A = !1,
  autoHideDelay: I = 3e3,
  renderIcon: s = null,
  onScrollToTop: w = void 0,
  onScrollToBottom: M = void 0,
  onScrollChange: q = void 0
}) => {
  const {
    scrollDirection: P,
    scrollProgress: e,
    isAtTop: l,
    isAtBottom: r,
    isVisible: o,
    isIdle: S,
    scrollToTop: g,
    scrollToBottom: H
  } = co({
    bottomRef: u,
    topRef: i,
    containerRef: f,
    showAtThreshold: Y,
    smoothScroll: _,
    autoHide: A,
    autoHideDelay: I,
    onScrollToTop: w,
    onScrollToBottom: M,
    onScrollChange: q
  }), n = !!f, C = n ? `react-scroll-up-down-btn--container react-scroll-up-down-btn--container-${v}` : `react-scroll-up-down-btn--${v}`, T = A && S ? "react-scroll-up-down-btn--hidden" : "", J = Q - e / 100 * Q, N = typeof D == "number" ? `${D}px` : D, so = typeof b == "number" ? `${b}px` : b, G = () => {
    if (!j) return null;
    const K = n ? `react-scroll-reading-bar react-scroll-reading-bar--container react-scroll-reading-bar--${B}` : `react-scroll-reading-bar react-scroll-reading-bar--${B}`;
    return /* @__PURE__ */ c(
      "div",
      {
        className: K,
        style: {
          height: N,
          backgroundColor: O,
          zIndex: W
        },
        "aria-hidden": "true",
        children: /* @__PURE__ */ c(
          "div",
          {
            className: "react-scroll-reading-bar-indicator",
            style: {
              background: F,
              width: `${e}%`
            }
          }
        )
      }
    );
  }, oo = () => L ? /* @__PURE__ */ x(
    "svg",
    {
      className: "react-scroll-up-down-progress-ring",
      viewBox: "0 0 44 44",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ c(
          "circle",
          {
            cx: "22",
            cy: "22",
            r: Z,
            fill: "none",
            stroke: U,
            strokeWidth: R
          }
        ),
        /* @__PURE__ */ c(
          "circle",
          {
            cx: "22",
            cy: "22",
            r: Z,
            fill: "none",
            stroke: z,
            strokeWidth: R,
            strokeDasharray: Q,
            strokeDashoffset: J,
            strokeLinecap: "round",
            style: { transition: "stroke-dashoffset 0.15s ease-out" }
          }
        )
      ]
    }
  ) : null;
  let $ = !1;
  if (t === "dynamic" ? $ = o && P !== null : t === "up-only" ? $ = !l : t === "down-only" ? $ = !r : t === "dual" && ($ = !l || !r), t === "dual") {
    const K = n ? `react-scroll-up-down-dual react-scroll-up-down-dual--container react-scroll-up-down-dual--${m} react-scroll-up-down-dual--container-${v} ${T} ${a}`.trim() : `react-scroll-up-down-dual react-scroll-up-down-dual--${m} react-scroll-up-down-dual--${v} ${T} ${a}`.trim();
    return /* @__PURE__ */ x(eo, { children: [
      G(),
      $ && /* @__PURE__ */ x(
        "div",
        {
          className: K,
          style: { ...y, gap: so },
          role: "group",
          "aria-label": "Scroll controls",
          children: [
            /* @__PURE__ */ x(
              "button",
              {
                type: "button",
                id: "scroll_button_top",
                "aria-label": p,
                title: p,
                className: `react-scroll-up-down-btn react-scroll-up-down-btn--dual ${l ? "react-scroll-up-down-btn--disabled" : ""}`,
                disabled: l,
                onClick: () => g(),
                children: [
                  oo(),
                  s ? s("up", Math.round(e)) : /* @__PURE__ */ c(X, { direction: "up", color: E })
                ]
              }
            ),
            /* @__PURE__ */ c(
              "button",
              {
                type: "button",
                id: "scroll_button_bottom",
                "aria-label": h,
                title: h,
                className: `react-scroll-up-down-btn react-scroll-up-down-btn--dual ${r ? "react-scroll-up-down-btn--disabled" : ""}`,
                disabled: r,
                onClick: () => H(),
                children: s ? s("down", Math.round(e)) : /* @__PURE__ */ c(X, { direction: "down", color: k })
              }
            )
          ]
        }
      )
    ] });
  }
  const V = t === "down-only" ? !0 : t === "up-only" ? !1 : P === "down", to = V ? "down" : "up", lo = V ? h : p, io = V ? () => H() : () => g(), ao = V ? k : E, uo = `react-scroll-up-down-btn ${C} ${T} ${a}`.trim();
  return /* @__PURE__ */ x(eo, { children: [
    G(),
    $ && /* @__PURE__ */ x(
      "button",
      {
        type: "button",
        id: "scroll_button",
        "aria-label": lo,
        title: lo,
        className: uo,
        style: y,
        onClick: io,
        children: [
          oo(),
          s ? s(to, Math.round(e)) : /* @__PURE__ */ c(X, { direction: to, color: ao })
        ]
      }
    )
  ] });
};
export {
  wo as ScrollUpDown,
  wo as default,
  ho as useScrollProgress,
  co as useScrollUpDown
};
