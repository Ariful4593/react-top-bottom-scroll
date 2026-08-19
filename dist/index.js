import "./index.css";
import { jsx as c, jsxs as A, Fragment as ro } from "react/jsx-runtime";
import { useState as $, useRef as L, useEffect as Z, useCallback as G } from "react";
function oo(l, e) {
  return typeof e == "boolean" ? e ? "smooth" : "auto" : l ? "smooth" : "auto";
}
function co(l) {
  let e = 0, t = 0, o = 0;
  return l ? (e = l.scrollTop || 0, t = l.scrollHeight || 0, o = l.clientHeight || 0) : typeof window < "u" && (e = window.scrollY || window.pageYOffset || typeof document < "u" && (document.documentElement?.scrollTop || document.body?.scrollTop) || 0, t = typeof document < "u" ? Math.max(
    document.body?.scrollHeight || 0,
    document.documentElement?.scrollHeight || 0
  ) : 0, o = window.innerHeight || typeof document < "u" && (document.documentElement?.clientHeight || document.body?.clientHeight) || 0), { scrollY: e, scrollHeight: t, clientHeight: o };
}
function so(l, e, t) {
  const o = l?.current, n = e?.current;
  if (o && typeof o.scrollIntoView == "function")
    o.scrollIntoView({ behavior: t, block: "end", inline: "nearest" });
  else if (n && typeof n.scrollTo == "function")
    n.scrollTo({ top: n.scrollHeight, behavior: t });
  else if (typeof window < "u" && typeof window.scrollTo == "function") {
    const r = typeof document < "u" && (document.documentElement?.scrollHeight || document.body?.scrollHeight) || 0;
    window.scrollTo({ top: r, behavior: t });
  }
}
function io(l, e, t) {
  const o = l?.current, n = e?.current;
  o && typeof o.scrollIntoView == "function" ? o.scrollIntoView({ behavior: t, block: "start", inline: "nearest" }) : n && typeof n.scrollTo == "function" ? n.scrollTo({ top: 0, behavior: t }) : typeof window < "u" && typeof window.scrollTo == "function" && window.scrollTo({ top: 0, behavior: t });
}
const to = (l = {}) => {
  const {
    bottomRef: e = null,
    topRef: t = null,
    containerRef: o = null,
    showAtThreshold: n = 10,
    smoothScroll: r = !0,
    autoHide: f = !1,
    autoHideDelay: u = 3e3,
    onScrollToTop: d,
    onScrollToBottom: w,
    onScrollChange: h
  } = l, [g, y] = $(null), [T, v] = $(0), [s, p] = $(0), [C, x] = $(0), [R, _] = $(!0), [D, F] = $(!1), [O, W] = $(!1), [z, U] = $(!1), I = L(0), k = L(null), B = L(h), P = L(d), H = L(w);
  Z(() => {
    B.current = h, P.current = d, H.current = w;
  });
  const j = G(
    (i) => {
      const m = oo(r, i);
      so(e, o, m), H.current && H.current();
    },
    [e, o, r]
  ), N = G(
    (i) => {
      const m = oo(r, i);
      io(t, o, m), P.current && P.current();
    },
    [t, o, r]
  );
  return Z(() => {
    const i = () => {
      const { scrollY: a, scrollHeight: M, clientHeight: V } = co(o?.current || null), E = I.current;
      let S = null;
      a > E && a > n ? S = "down" : a < E && a > 0 ? S = "up" : a === 0 && (S = null), y((no) => S !== null ? S : no);
      const b = Math.max(0, M - V), Y = b > 0 ? Math.min(100, Math.max(0, a / b * 100)) : 0, Q = Number.isNaN(Y) ? 0 : Y, lo = a < n, X = b > 0 && a + V >= M - 20;
      p(a), x(b), v(Q), _(lo), F(X), W(!X && a >= n), I.current = a, B.current && B.current(S, Math.round(Q)), f && (U(!1), k.current && clearTimeout(k.current), k.current = setTimeout(() => U(!0), u));
    }, m = o?.current || (typeof window < "u" ? window : null);
    return m && (m.addEventListener("scroll", i, { passive: !0 }), typeof window < "u" && window.addEventListener("resize", i, { passive: !0 }), i()), () => {
      m && m.removeEventListener("scroll", i), typeof window < "u" && window.removeEventListener("resize", i), k.current && clearTimeout(k.current);
    };
  }, [o, n, f, u]), {
    scrollDirection: g,
    scrollProgress: T,
    currentScrollY: s,
    maxScrollable: C,
    isAtTop: R,
    isAtBottom: D,
    isVisible: O,
    isIdle: z,
    scrollToTop: N,
    scrollToBottom: j
  };
}, ao = ({
  showProgressBar: l = !1,
  progressBarPosition: e = "top",
  progressBarHeight: t = 3,
  progressBarColor: o = "#3b82f6",
  progressBarTrackColor: n = "transparent",
  progressBarZIndex: r = 10002,
  scrollProgress: f,
  isContainerMode: u
}) => {
  if (!l) return null;
  const d = typeof t == "number" ? `${t}px` : t, w = u ? `react-scroll-reading-bar react-scroll-reading-bar--container react-scroll-reading-bar--${e}` : `react-scroll-reading-bar react-scroll-reading-bar--${e}`;
  return /* @__PURE__ */ c(
    "div",
    {
      className: w,
      style: {
        height: d,
        backgroundColor: n,
        zIndex: r
      },
      "aria-hidden": "true",
      children: /* @__PURE__ */ c(
        "div",
        {
          className: "react-scroll-reading-bar-indicator",
          style: {
            background: o,
            width: `${f}%`
          }
        }
      )
    }
  );
}, J = ({ direction: l, color: e }) => /* @__PURE__ */ c(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    height: "16",
    width: "12",
    viewBox: "0 0 384 512",
    fill: e,
    style: l === "down" ? { transform: "rotate(180deg)" } : void 0,
    "aria-hidden": "true",
    children: /* @__PURE__ */ c("path", { d: "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" })
  }
), K = 18, q = 2 * Math.PI * K, eo = ({
  showProgress: l = !1,
  progressColor: e = "#3b82f6",
  progressTrackColor: t = "rgba(255, 255, 255, 0.2)",
  progressStrokeWidth: o = 3,
  scrollProgress: n
}) => {
  if (!l) return null;
  const r = q - n / 100 * q;
  return /* @__PURE__ */ A(
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
            r: K,
            fill: "none",
            stroke: t,
            strokeWidth: o
          }
        ),
        /* @__PURE__ */ c(
          "circle",
          {
            cx: "22",
            cy: "22",
            r: K,
            fill: "none",
            stroke: e,
            strokeWidth: o,
            strokeDasharray: q,
            strokeDashoffset: r,
            strokeLinecap: "round",
            style: { transition: "stroke-dashoffset 0.15s ease-out" }
          }
        )
      ]
    }
  );
}, uo = ({
  dualLayout: l = "vertical",
  dualGap: e = 8,
  position: t = "bottom-right",
  isContainerMode: o,
  hiddenClass: n,
  className: r = "",
  style: f = {},
  upTitleMessage: u = "Scroll to top",
  downTitleMessage: d = "Scroll to bottom",
  upIconColor: w = "white",
  downIconColor: h = "white",
  isAtTop: g,
  isAtBottom: y,
  scrollToTop: T,
  scrollToBottom: v,
  renderIcon: s,
  ...p
}) => {
  const C = typeof e == "number" ? `${e}px` : e, x = o ? `react-scroll-up-down-dual react-scroll-up-down-dual--container react-scroll-up-down-dual--${l} react-scroll-up-down-dual--container-${t} ${n} ${r}`.trim() : `react-scroll-up-down-dual react-scroll-up-down-dual--${l} react-scroll-up-down-dual--${t} ${n} ${r}`.trim();
  return /* @__PURE__ */ A(
    "div",
    {
      className: x,
      style: { ...f, gap: C },
      role: "group",
      "aria-label": "Scroll controls",
      children: [
        /* @__PURE__ */ A(
          "button",
          {
            type: "button",
            id: "scroll_button_top",
            "aria-label": u,
            title: u,
            className: `react-scroll-up-down-btn react-scroll-up-down-btn--dual ${g ? "react-scroll-up-down-btn--disabled" : ""}`,
            disabled: g,
            onClick: () => T(),
            children: [
              /* @__PURE__ */ c(eo, { ...p }),
              s ? s("up", Math.round(p.scrollProgress)) : /* @__PURE__ */ c(J, { direction: "up", color: w })
            ]
          }
        ),
        /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            id: "scroll_button_bottom",
            "aria-label": d,
            title: d,
            className: `react-scroll-up-down-btn react-scroll-up-down-btn--dual ${y ? "react-scroll-up-down-btn--disabled" : ""}`,
            disabled: y,
            onClick: () => v(),
            children: s ? s("down", Math.round(p.scrollProgress)) : /* @__PURE__ */ c(J, { direction: "down", color: h })
          }
        )
      ]
    }
  );
}, fo = ({
  mode: l = "dynamic",
  scrollDirection: e,
  position: t = "bottom-right",
  isContainerMode: o,
  hiddenClass: n,
  className: r = "",
  style: f = {},
  upTitleMessage: u = "Scroll to top",
  downTitleMessage: d = "Scroll to bottom",
  upIconColor: w = "white",
  downIconColor: h = "white",
  scrollToTop: g,
  scrollToBottom: y,
  renderIcon: T,
  ...v
}) => {
  const s = l === "down-only" ? !0 : l === "up-only" ? !1 : e === "down", p = s ? "down" : "up", C = s ? d : u, x = s ? () => y() : () => g(), R = s ? h : w, D = `react-scroll-up-down-btn ${o ? `react-scroll-up-down-btn--container react-scroll-up-down-btn--container-${t}` : `react-scroll-up-down-btn--${t}`} ${n} ${r}`.trim();
  return /* @__PURE__ */ A(
    "button",
    {
      type: "button",
      id: "scroll_button",
      "aria-label": C,
      title: C,
      className: D,
      style: f,
      onClick: x,
      children: [
        /* @__PURE__ */ c(eo, { ...v }),
        T ? T(p, Math.round(v.scrollProgress)) : /* @__PURE__ */ c(J, { direction: p, color: R })
      ]
    }
  );
}, bo = ({
  bottomRef: l = null,
  topRef: e = null,
  containerRef: t = null,
  mode: o = "dynamic",
  dualLayout: n = "vertical",
  dualGap: r = 8,
  upIconColor: f = "white",
  downIconColor: u = "white",
  upTitleMessage: d = "Scroll to top",
  downTitleMessage: w = "Scroll to bottom",
  style: h = {},
  className: g = "",
  position: y = "bottom-right",
  showAtThreshold: T = 10,
  smoothScroll: v = !0,
  showProgress: s = !1,
  progressColor: p = "#3b82f6",
  progressTrackColor: C = "rgba(255, 255, 255, 0.2)",
  progressStrokeWidth: x = 3,
  showProgressBar: R = !1,
  progressBarPosition: _ = "top",
  progressBarHeight: D = 3,
  progressBarColor: F = "#3b82f6",
  progressBarTrackColor: O = "transparent",
  progressBarZIndex: W = 10002,
  autoHide: z = !1,
  autoHideDelay: U = 3e3,
  renderIcon: I = null,
  onScrollToTop: k = void 0,
  onScrollToBottom: B = void 0,
  onScrollChange: P = void 0
}) => {
  const {
    scrollDirection: H,
    scrollProgress: j,
    isAtTop: N,
    isAtBottom: i,
    isVisible: m,
    isIdle: a,
    scrollToTop: M,
    scrollToBottom: V
  } = to({
    bottomRef: l,
    topRef: e,
    containerRef: t,
    showAtThreshold: T,
    smoothScroll: v,
    autoHide: z,
    autoHideDelay: U,
    onScrollToTop: k,
    onScrollToBottom: B,
    onScrollChange: P
  }), E = !!t, S = z && a ? "react-scroll-up-down-btn--hidden" : "";
  let b = !1;
  o === "dynamic" ? b = m && H !== null : o === "up-only" ? b = !N : o === "down-only" ? b = !i : o === "dual" && (b = !N || !i);
  const Y = {
    showProgress: s,
    progressColor: p,
    progressTrackColor: C,
    progressStrokeWidth: x,
    scrollProgress: j
  };
  return /* @__PURE__ */ A(ro, { children: [
    /* @__PURE__ */ c(
      ao,
      {
        showProgressBar: R,
        progressBarPosition: _,
        progressBarHeight: D,
        progressBarColor: F,
        progressBarTrackColor: O,
        progressBarZIndex: W,
        scrollProgress: j,
        isContainerMode: E
      }
    ),
    b && (o === "dual" ? /* @__PURE__ */ c(
      uo,
      {
        dualLayout: n,
        dualGap: r,
        position: y,
        isContainerMode: E,
        hiddenClass: S,
        className: g,
        style: h,
        upTitleMessage: d,
        downTitleMessage: w,
        upIconColor: f,
        downIconColor: u,
        isAtTop: N,
        isAtBottom: i,
        scrollToTop: M,
        scrollToBottom: V,
        renderIcon: I || void 0,
        ...Y
      }
    ) : /* @__PURE__ */ c(
      fo,
      {
        mode: o,
        scrollDirection: H,
        position: y,
        isContainerMode: E,
        hiddenClass: S,
        className: g,
        style: h,
        upTitleMessage: d,
        downTitleMessage: w,
        upIconColor: f,
        downIconColor: u,
        scrollToTop: M,
        scrollToBottom: V,
        renderIcon: I || void 0,
        ...Y
      }
    ))
  ] });
}, ho = (l = null) => {
  const { scrollProgress: e, currentScrollY: t, maxScrollable: o } = to({
    containerRef: l
  });
  return {
    scrollProgress: e,
    currentScrollY: t,
    maxScrollable: o
  };
};
export {
  bo as ScrollUpDown,
  bo as default,
  ho as useScrollProgress,
  to as useScrollUpDown
};
