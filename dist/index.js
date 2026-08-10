import "./index.css";
import { jsxs as N, jsx as f } from "react/jsx-runtime";
import { useState as m, useRef as P, useCallback as V, useEffect as nt } from "react";
const v = 18, E = 2 * Math.PI * v, at = ({
  bottomRef: k = null,
  topRef: y = null,
  containerRef: l = null,
  upIconColor: Y = "white",
  downIconColor: U = "white",
  upTitleMessage: _ = "Scroll to top",
  downTitleMessage: j = "Scroll to bottom",
  style: z = {},
  className: F = "",
  position: x = "bottom-right",
  showAtThreshold: w = 10,
  smoothScroll: O = !0,
  showProgress: W = !1,
  progressColor: q = "#3b82f6",
  progressTrackColor: A = "rgba(255, 255, 255, 0.2)",
  progressStrokeWidth: M = 3,
  autoHide: h = !1,
  autoHideDelay: H = 3e3,
  renderIcon: I = null,
  onScrollToTop: p = void 0,
  onScrollToBottom: b = void 0,
  onScrollChange: g = void 0
}) => {
  const [s, G] = m(null), [J, K] = m(!1), [S, Q] = m(0), [X, D] = m(!1), L = P(0), c = P(null), n = O ? "smooth" : "auto", Z = V(() => {
    const o = k?.current, t = l?.current;
    o ? o.scrollIntoView({
      behavior: n,
      block: "end",
      inline: "nearest"
    }) : t ? t.scrollTo({
      top: t.scrollHeight,
      behavior: n
    }) : typeof window < "u" && window.scrollTo({
      top: document.documentElement.scrollHeight || document.body.scrollHeight,
      behavior: n
    }), b && b();
  }, [k, l, n, b]), R = V(() => {
    const o = y?.current, t = l?.current;
    o ? o.scrollIntoView({
      behavior: n,
      block: "start",
      inline: "nearest"
    }) : t ? t.scrollTo({
      top: 0,
      behavior: n
    }) : typeof window < "u" && window.scrollTo({
      top: 0,
      behavior: n
    }), p && p();
  }, [y, l, n, p]);
  if (nt(() => {
    const o = () => {
      const d = l?.current;
      let e = 0, u = 0, a = 0;
      d ? (e = d.scrollTop, u = d.scrollHeight, a = d.clientHeight) : typeof window < "u" && (e = window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0, u = Math.max(
        document.body?.scrollHeight || 0,
        document.documentElement?.scrollHeight || 0
      ), a = window.innerHeight || document.documentElement?.clientHeight || 0);
      const $ = L.current;
      let r = s;
      e > $ && e > w ? r = "down" : e < $ && e > 0 ? r = "up" : e === 0 && (r = null), r !== s && G(r);
      const C = u - a, B = C > 0 ? Math.min(100, Math.max(0, e / C * 100)) : 0;
      Q(B);
      const lt = C > 0 && e + a >= u - 20;
      K(!lt && e >= w), L.current = e, g && g(r, Math.round(B)), h && (D(!1), c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        D(!0);
      }, H));
    }, t = l?.current || (typeof window < "u" ? window : null);
    return t && (t.addEventListener("scroll", o, { passive: !0 }), o()), () => {
      t && t.removeEventListener("scroll", o), c.current && clearTimeout(c.current);
    };
  }, [
    l,
    w,
    h,
    H,
    s,
    g
  ]), !J || !s)
    return null;
  const i = s === "down", T = i ? j : _, tt = i ? Z : R, et = E - S / 100 * E, ot = `react-scroll-up-down-btn ${!!l ? `react-scroll-up-down-btn--container react-scroll-up-down-btn--container-${x}` : `react-scroll-up-down-btn--${x}`} ${h && X ? "react-scroll-up-down-btn--hidden" : ""} ${F}`.trim();
  return /* @__PURE__ */ N(
    "button",
    {
      type: "button",
      id: "scroll_button",
      "aria-label": T,
      title: T,
      className: ot,
      style: z,
      onClick: tt,
      children: [
        W && /* @__PURE__ */ N(
          "svg",
          {
            className: "react-scroll-up-down-progress-ring",
            viewBox: "0 0 44 44",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ f(
                "circle",
                {
                  cx: "22",
                  cy: "22",
                  r: v,
                  fill: "none",
                  stroke: A,
                  strokeWidth: M
                }
              ),
              /* @__PURE__ */ f(
                "circle",
                {
                  cx: "22",
                  cy: "22",
                  r: v,
                  fill: "none",
                  stroke: q,
                  strokeWidth: M,
                  strokeDasharray: E,
                  strokeDashoffset: et,
                  strokeLinecap: "round",
                  style: { transition: "stroke-dashoffset 0.15s ease-out" }
                }
              )
            ]
          }
        ),
        I ? I(s, Math.round(S)) : /* @__PURE__ */ f(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            height: "16",
            width: "12",
            viewBox: "0 0 384 512",
            fill: i ? U : Y,
            style: i ? { transform: "rotate(180deg)" } : void 0,
            "aria-hidden": "true",
            children: /* @__PURE__ */ f("path", { d: "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" })
          }
        )
      ]
    }
  );
};
export {
  at as default
};
