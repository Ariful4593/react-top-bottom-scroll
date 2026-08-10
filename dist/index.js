import "./index.css";
import { jsxs as N, jsx as f } from "react/jsx-runtime";
import { useState as m, useRef as P, useCallback as V, useEffect as nt } from "react";
const k = 18, v = 2 * Math.PI * k, ut = ({
  bottomRef: C = null,
  topRef: y = null,
  containerRef: n = null,
  upIconColor: Y = "white",
  downIconColor: $ = "white",
  upTitleMessage: U = "Scroll to top",
  downTitleMessage: _ = "Scroll to bottom",
  style: j = {},
  className: z = "",
  position: F = "bottom-right",
  showAtThreshold: w = 10,
  smoothScroll: O = !0,
  showProgress: W = !1,
  progressColor: q = "#3b82f6",
  progressTrackColor: A = "rgba(255, 255, 255, 0.2)",
  progressStrokeWidth: x = 3,
  autoHide: h = !1,
  autoHideDelay: H = 3e3,
  renderIcon: I = null,
  onScrollToTop: p = void 0,
  onScrollToBottom: g = void 0,
  onScrollChange: b = void 0
}) => {
  const [s, G] = m(null), [J, K] = m(!1), [M, Q] = m(0), [R, S] = m(!1), D = P(0), c = P(null), l = O ? "smooth" : "auto", X = V(() => {
    const o = C?.current, t = n?.current;
    o ? o.scrollIntoView({
      behavior: l,
      block: "end",
      inline: "nearest"
    }) : t ? t.scrollTo({
      top: t.scrollHeight,
      behavior: l
    }) : typeof window < "u" && window.scrollTo({
      top: document.documentElement.scrollHeight || document.body.scrollHeight,
      behavior: l
    }), g && g();
  }, [C, n, l, g]), Z = V(() => {
    const o = y?.current, t = n?.current;
    o ? o.scrollIntoView({
      behavior: l,
      block: "start",
      inline: "nearest"
    }) : t ? t.scrollTo({
      top: 0,
      behavior: l
    }) : typeof window < "u" && window.scrollTo({
      top: 0,
      behavior: l
    }), p && p();
  }, [y, n, l, p]);
  if (nt(() => {
    const o = () => {
      const d = n?.current;
      let e = 0, u = 0, a = 0;
      d ? (e = d.scrollTop, u = d.scrollHeight, a = d.clientHeight) : typeof window < "u" && (e = window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0, u = Math.max(
        document.body?.scrollHeight || 0,
        document.documentElement?.scrollHeight || 0
      ), a = window.innerHeight || document.documentElement?.clientHeight || 0);
      const T = D.current;
      let r = s;
      e > T && e > w ? r = "down" : e < T && e > 0 ? r = "up" : e === 0 && (r = null), r !== s && G(r);
      const E = u - a, B = E > 0 ? Math.min(100, Math.max(0, e / E * 100)) : 0;
      Q(B);
      const lt = E > 0 && e + a >= u - 20;
      K(!lt && e >= w), D.current = e, b && b(r, Math.round(B)), h && (S(!1), c.current && clearTimeout(c.current), c.current = setTimeout(() => {
        S(!0);
      }, H));
    }, t = n?.current || (typeof window < "u" ? window : null);
    return t && (t.addEventListener("scroll", o, { passive: !0 }), o()), () => {
      t && t.removeEventListener("scroll", o), c.current && clearTimeout(c.current);
    };
  }, [
    n,
    w,
    h,
    H,
    s,
    b
  ]), !J || !s)
    return null;
  const i = s === "down", L = i ? _ : U, tt = i ? X : Z, et = v - M / 100 * v, ot = `react-scroll-up-down-btn ${`react-scroll-up-down-btn--${F}`} ${h && R ? "react-scroll-up-down-btn--hidden" : ""} ${z}`.trim();
  return /* @__PURE__ */ N(
    "button",
    {
      type: "button",
      id: "scroll_button",
      "aria-label": L,
      title: L,
      className: ot,
      style: j,
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
                  r: k,
                  fill: "none",
                  stroke: A,
                  strokeWidth: x
                }
              ),
              /* @__PURE__ */ f(
                "circle",
                {
                  cx: "22",
                  cy: "22",
                  r: k,
                  fill: "none",
                  stroke: q,
                  strokeWidth: x,
                  strokeDasharray: v,
                  strokeDashoffset: et,
                  strokeLinecap: "round",
                  style: { transition: "stroke-dashoffset 0.15s ease-out" }
                }
              )
            ]
          }
        ),
        I ? I(s, Math.round(M)) : /* @__PURE__ */ f(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            height: "16",
            width: "12",
            viewBox: "0 0 384 512",
            fill: i ? $ : Y,
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
  ut as default
};
