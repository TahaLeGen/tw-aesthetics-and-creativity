import { LitElement as m, html as l } from "lit";
import { property as c } from "lit/decorators.js";
var f = Object.defineProperty, d = (n, r, o, a) => {
  for (var e = void 0, t = n.length - 1, s; t >= 0; t--)
    (s = n[t]) && (e = s(r, o, e) || e);
  return e && f(r, o, e), e;
};
class p extends m {
  createRenderRoot() {
    return this;
  }
  get cfg() {
    var r, o, a, e, t;
    return {
      background: ((r = this.config) == null ? void 0 : r.background) ?? "rgba(22,22,26,0.98)",
      text_color: ((o = this.config) == null ? void 0 : o.text_color) ?? "#ffffff",
      speed: ((a = this.config) == null ? void 0 : a.speed) ?? 25,
      separator: ((e = this.config) == null ? void 0 : e.separator) ?? "✦",
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
    const { background: r, text_color: o, speed: a, separator: e, items: t } = this.cfg, s = [...t, ...t];
    return l`
      <style>
        .mq-section {
          overflow: hidden; width: 100%;
          background: ${r};
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 1rem 0; direction: rtl;
        }
        .mq-track { display: flex; width: max-content; animation: mq-scroll ${a}s linear infinite; }
        .mq-track:hover { animation-play-state: paused; }
        .mq-item {
          display: inline-flex; align-items: center; gap: 1rem;
          padding: 0 1.5rem; white-space: nowrap;
          font-size: 1rem; font-weight: 500; color: ${o};
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .mq-separator { color: rgba(255,255,255,0.3); font-size: 0.6rem; }
        @keyframes mq-scroll {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      </style>
      <div class="mq-section">
        <div class="mq-track">
          ${s.map((i) => l`
            <span class="mq-item">
              ${i.icon ? l`<span>${i.icon}</span>` : ""}
              ${i.text}
              <span class="mq-separator">${e}</span>
            </span>
          `)}
        </div>
      </div>
    `;
  }
}
d([
  c({ type: Object })
], p.prototype, "config");
typeof p < "u" && p.registerSallaComponent("salla-marquee");
export {
  p as MarqueeComponent
};
