import "./index.css";
import { jsx as t } from "react/jsx-runtime";
import { useState as S, useRef as M, useCallback as f, useEffect as z } from "react";
const N = ({
  bottomRef: e = null,
  topRef: n = null,
  upIconColor: E = "white",
  downIconColor: H = "white",
  upTitleMessage: k = "Scroll to top",
  downTitleMessage: x = "Scroll to bottom",
  style: T = {},
  className: B = "",
  renderIcon: i = null
}) => {
  const [c, r] = S(null), [L, y] = S(!1), d = M(0), C = f(() => {
    const o = e == null ? void 0 : e.current;
    o ? o.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    }) : window.scrollTo({
      top: document.documentElement.scrollHeight || document.body.scrollHeight,
      behavior: "smooth"
    });
  }, [e]), D = f(() => {
    const o = n == null ? void 0 : n.current;
    o ? o.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    }) : window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [n]);
  if (z(() => {
    const o = () => {
      var m, p, g, v, b;
      if (typeof window > "u") return;
      const l = window.scrollY || ((m = document.documentElement) == null ? void 0 : m.scrollTop) || ((p = document.body) == null ? void 0 : p.scrollTop) || 0, h = d.current;
      l > h && l > 10 ? r("down") : l < h && l > 0 ? r("up") : l === 0 && r(null);
      const w = Math.max(
        ((g = document.body) == null ? void 0 : g.scrollHeight) || 0,
        ((v = document.documentElement) == null ? void 0 : v.scrollHeight) || 0
      ), a = window.innerHeight || ((b = document.documentElement) == null ? void 0 : b.clientHeight) || 0, Y = w > a && l + a >= w - 20;
      y(!Y && l > 0), d.current = l;
    };
    return window.addEventListener("scroll", o, { passive: !0 }), o(), () => {
      window.removeEventListener("scroll", o);
    };
  }, []), !L || !c)
    return null;
  const s = c === "down", u = s ? x : k, V = s ? C : D;
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      id: "scroll_button",
      "aria-label": u,
      title: u,
      className: `react-scroll-up-down-btn ${B}`.trim(),
      style: T,
      onClick: V,
      children: i ? i(c) : s ? /* @__PURE__ */ t(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          height: "16",
          width: "12",
          viewBox: "0 0 384 512",
          fill: H,
          "aria-hidden": "true",
          children: /* @__PURE__ */ t("path", { d: "M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" })
        }
      ) : /* @__PURE__ */ t(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          height: "16",
          width: "12",
          viewBox: "0 0 384 512",
          fill: E,
          "aria-hidden": "true",
          children: /* @__PURE__ */ t("path", { d: "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" })
        }
      )
    }
  );
};
export {
  N as default
};
