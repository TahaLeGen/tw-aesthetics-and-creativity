import { LitElement as c, html as l } from "lit";
import { property as d } from "lit/decorators.js";
import { l as p } from "./i18n-P4yXTTHR.js";
var f = Object.defineProperty, g = (s, r, a, o) => {
  for (var e = void 0, t = s.length - 1, n; t >= 0; t--)
    (n = s[t]) && (e = n(r, a, e) || e);
  return e && f(r, a, e), e;
};
class m extends c {
  createRenderRoot() {
    return this;
  }
  get cfg() {
    var r, a, o, e, t;
    return {
      background: ((r = this.config) == null ? void 0 : r.background) ?? "rgba(22,22,26,0.98)",
      text_color: ((a = this.config) == null ? void 0 : a.text_color) ?? "#ffffff",
      speed: ((o = this.config) == null ? void 0 : o.speed) ?? 25,
      separator: p((e = this.config) == null ? void 0 : e.separator, "✦"),
      items: ((t = this.config) == null ? void 0 : t.items) ?? [
        { text: "تصميم إبداعي" },
        { text: "تجربة مستخدم استثنائية" },
        { text: "أداء عالي السرعة" },
        { text: "واجهات حديثة" },
        { text: "تطوير متقدم" },
        { text: "حلول رقمية متكاملة" }
      ]
    };
  }
  render() {
    const { background: r, text_color: a, speed: o, separator: e, items: t } = this.cfg, n = [...t, ...t];
    return l`
      <style>
        .mq-section { overflow:hidden; width:100%; background:${r}; border-top:1px solid rgba(255,255,255,0.06); border-bottom:1px solid rgba(255,255,255,0.06); padding:1rem 0; direction:rtl; }
        .mq-track { display:flex; width:max-content; animation:mq-scroll ${o}s linear infinite; }
        .mq-track:hover { animation-play-state:paused; }
        .mq-item { display:inline-flex; align-items:center; gap:1rem; padding:0 1.5rem; white-space:nowrap; font-size:1rem; font-weight:500; color:${a}; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
        .mq-separator { color:rgba(255,255,255,0.3); font-size:0.6rem; }
        @keyframes mq-scroll { 0% { transform:translateX(0%); } 100% { transform:translateX(-50%); } }
      </style>
      <div class="mq-section">
        <div class="mq-track">
          ${n.map((i) => l`
            <span class="mq-item">
              ${i.icon ? l`<span aria-hidden="true">${i.icon}</span>` : ""}
              ${p(i.text)}
              <span class="mq-separator" aria-hidden="true">${e}</span>
            </span>
          `)}
        </div>
      </div>
    `;
  }
}
g([
  d({ type: Object })
], m.prototype, "config");
typeof m < "u" && m.registerSallaComponent("salla-marquee");
export {
  m as MarqueeComponent
};
