import "./index.css";
import { jsx as c } from "react/jsx-runtime";
import { useState as w, useRef as C, useCallback as p, useEffect as D } from "react";
const M = ({
  bottomRef: r = null,
  topRef: s = null,
  upIconColor: f = "white",
  downIconColor: b = "white",
  upTitleMessage: v = "Scroll to top",
  downTitleMessage: g = "Scroll to bottom",
  style: S = {},
  className: E = "",
  renderIcon: i = null
}) => {
  const [l, n] = w(null), [H, k] = w(!1), d = C(0), T = p(() => {
    const o = r?.current;
    o ? o.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest"
    }) : window.scrollTo({
      top: document.documentElement.scrollHeight || document.body.scrollHeight,
      behavior: "smooth"
    });
  }, [r]), y = p(() => {
    const o = s?.current;
    o ? o.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    }) : window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [s]);
  if (D(() => {
    const o = () => {
      if (typeof window > "u") return;
      const t = window.scrollY || document.documentElement?.scrollTop || document.body?.scrollTop || 0, m = d.current;
      t > m && t > 10 ? n("down") : t < m && t > 0 ? n("up") : t === 0 && n(null);
      const h = Math.max(
        document.body?.scrollHeight || 0,
        document.documentElement?.scrollHeight || 0
      ), a = window.innerHeight || document.documentElement?.clientHeight || 0, B = h > a && t + a >= h - 20;
      k(!B && t > 0), d.current = t;
    };
    return window.addEventListener("scroll", o, { passive: !0 }), o(), () => {
      window.removeEventListener("scroll", o);
    };
  }, []), !H || !l)
    return null;
  const e = l === "down", u = e ? g : v, x = e ? T : y;
  return /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      id: "scroll_button",
      "aria-label": u,
      title: u,
      className: `react-scroll-up-down-btn ${E}`.trim(),
      style: S,
      onClick: x,
      children: i ? i(l) : /* @__PURE__ */ c(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          height: "16",
          width: "12",
          viewBox: "0 0 384 512",
          fill: e ? b : f,
          style: e ? { transform: "rotate(180deg)" } : void 0,
          "aria-hidden": "true",
          children: /* @__PURE__ */ c("path", { d: "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" })
        }
      )
    }
  );
};
export {
  M as default
};
