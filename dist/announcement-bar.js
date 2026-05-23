import { LitElement as b, html as f } from "lit";
import { property as p, state as d } from "lit/decorators.js";
var u = Object.defineProperty, c = (a, t, n, i) => {
  for (var e = void 0, o = a.length - 1, s; o >= 0; o--)
    (s = a[o]) && (e = s(t, n, e) || e);
  return e && u(t, n, e), e;
};
class r extends b {
  constructor() {
    super(...arguments), this.visible = !0, this.secondsLeft = 0;
  }
  createRenderRoot() {
    return this;
  }
  get cfg() {
    var t, n, i, e, o, s, l;
    return {
      background: ((t = this.config) == null ? void 0 : t.background) ?? "linear-gradient(270deg,#ff416c,#ff4b2b,#ff416c)",
      text_color: ((n = this.config) == null ? void 0 : n.text_color) ?? "#ffffff",
      message: ((i = this.config) == null ? void 0 : i.message) ?? "🔥 خصم 20% لفترة محدودة",
      button_text: ((e = this.config) == null ? void 0 : e.button_text) ?? "اطلب الآن",
      button_link: ((o = this.config) == null ? void 0 : o.button_link) ?? "#",
      button_color: ((s = this.config) == null ? void 0 : s.button_color) ?? "#ff416c",
      countdown_seconds: ((l = this.config) == null ? void 0 : l.countdown_seconds) ?? 86400
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.secondsLeft = this.cfg.countdown_seconds, this.startTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.timerInterval && clearInterval(this.timerInterval);
  }
  startTimer() {
    this.timerInterval = window.setInterval(() => {
      this.secondsLeft > 0 ? this.secondsLeft-- : clearInterval(this.timerInterval);
    }, 1e3);
  }
  formatTime(t) {
    const n = Math.floor(t / 3600), i = Math.floor(t % 3600 / 60), e = t % 60;
    return `${n}h ${i}m ${e}s`;
  }
  render() {
    if (!this.visible) return f``;
    const t = this.cfg;
    return f`
      <style>
        .ab-bar {
          position: fixed; top: 0; width: 100%; z-index: 9999;
          background: ${t.background};
          background-size: 600% 600%;
          animation: ab-gradient 8s ease infinite;
          color: ${t.text_color};
          padding: 10px;
          font-family: sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .ab-content { display: flex; justify-content: center; align-items: center; gap: 15px; }
        .ab-btn {
          background: ${t.text_color};
          color: ${t.button_color};
          border: none; padding: 5px 10px; cursor: pointer; border-radius: 5px;
          font-weight: 600; text-decoration: none; font-size: 14px;
        }
        .ab-close { position: absolute; right: 15px; cursor: pointer; font-size: 16px; }
        @keyframes ab-gradient { 0%,100% { background-position: 0%; } 50% { background-position: 100%; } }
        @media (max-width: 600px) { .ab-content { flex-direction: column; gap: 8px; } }
      </style>
      <div class="ab-bar" dir="rtl">
        <div class="ab-content">
          <span>${t.message}</span>
          <span>${this.formatTime(this.secondsLeft)}</span>
          <a class="ab-btn" href="${t.button_link}">${t.button_text}</a>
        </div>
        <span class="ab-close" @click="${() => {
      this.visible = !1;
    }}">✖</span>
      </div>
    `;
  }
}
c([
  p({ type: Object })
], r.prototype, "config");
c([
  d()
], r.prototype, "visible");
c([
  d()
], r.prototype, "secondsLeft");
typeof r < "u" && r.registerSallaComponent("salla-announcement-bar");
export {
  r as AnnouncementBar
};
