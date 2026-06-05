import { LitElement as p, html as d } from "lit";
import { property as u, state as b } from "lit/decorators.js";
import { l as f } from "./i18n-P4yXTTHR.js";
var g = Object.defineProperty, c = (a, t, n, i) => {
  for (var e = void 0, o = a.length - 1, r; o >= 0; o--)
    (r = a[o]) && (e = r(t, n, e) || e);
  return e && g(t, n, e), e;
};
class s extends p {
  constructor() {
    super(...arguments), this.visible = !0, this.secondsLeft = 0;
  }
  createRenderRoot() {
    return this;
  }
  get cfg() {
    var t, n, i, e, o, r, l;
    return {
      background: ((t = this.config) == null ? void 0 : t.background) ?? "linear-gradient(270deg,#ff416c,#ff4b2b,#ff416c)",
      text_color: ((n = this.config) == null ? void 0 : n.text_color) ?? "#ffffff",
      button_color: ((i = this.config) == null ? void 0 : i.button_color) ?? "#ff416c",
      message: f((e = this.config) == null ? void 0 : e.message, "🔥 خصم 20% لفترة محدودة"),
      button_text: f((o = this.config) == null ? void 0 : o.button_text, "اطلب الآن"),
      button_link: ((r = this.config) == null ? void 0 : r.button_link) ?? "#",
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
    return `${n}:${String(i).padStart(2, "0")}:${String(e).padStart(2, "0")}`;
  }
  render() {
    if (!this.visible) return d``;
    const t = this.cfg;
    return d`
      <style>
        .ab-bar { position:fixed; top:0; width:100%; z-index:9999; background:${t.background}; background-size:600% 600%; animation:ab-gradient 8s ease infinite; color:${t.text_color}; padding:10px; font-family:sans-serif; display:flex; justify-content:center; align-items:center; }
        .ab-content { display:flex; justify-content:center; align-items:center; gap:15px; }
        .ab-btn { background:${t.text_color}; color:${t.button_color}; border:none; padding:5px 10px; cursor:pointer; border-radius:5px; font-weight:600; text-decoration:none; font-size:14px; }
        .ab-close { position:absolute; right:15px; cursor:pointer; font-size:16px; background:none; border:none; color:inherit; line-height:1; }
        @keyframes ab-gradient { 0%,100% { background-position:0%; } 50% { background-position:100%; } }
        @media (max-width:600px) { .ab-content { flex-direction:column; gap:8px; } }
      </style>
      <div class="ab-bar" dir="rtl" role="banner" aria-live="polite">
        <div class="ab-content">
          <span>${t.message}</span>
          <span aria-label="الوقت المتبقي">${this.formatTime(this.secondsLeft)}</span>
          <a class="ab-btn" href="${t.button_link}">${t.button_text}</a>
        </div>
        <button class="ab-close" aria-label="إغلاق الإعلان" @click="${() => {
      this.visible = !1;
    }}">✖</button>
      </div>
    `;
  }
}
c([
  u({ type: Object })
], s.prototype, "config");
c([
  b()
], s.prototype, "visible");
c([
  b()
], s.prototype, "secondsLeft");
typeof s < "u" && s.registerSallaComponent("salla-announcement-bar");
export {
  s as AnnouncementBar
};
