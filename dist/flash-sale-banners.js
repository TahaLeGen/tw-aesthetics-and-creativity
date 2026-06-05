import { LitElement as x, html as h } from "lit";
import { property as m, state as g } from "lit/decorators.js";
import { l as r } from "./i18n-P4yXTTHR.js";
var v = Object.defineProperty, u = (c, t, i, n) => {
  for (var e = void 0, s = c.length - 1, o; s >= 0; s--)
    (o = c[s]) && (e = o(t, i, e) || e);
  return e && v(t, i, e), e;
};
class l extends x {
  constructor() {
    super(...arguments), this.timerState = { hours: 0, minutes: 0, seconds: 0 }, this.timerId = null;
  }
  createRenderRoot() {
    return this;
  }
  get cfg() {
    var n, e, s, o, a, d, p, f, b;
    const t = (n = this.config) == null ? void 0 : n.expiration_date, i = t ? new Date(t).getTime() : Date.now() + 36e5;
    return {
      background: ((e = this.config) == null ? void 0 : e.background) ?? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      primary_color: ((s = this.config) == null ? void 0 : s.primary_color) ?? "#ff4757",
      badge_color: ((o = this.config) == null ? void 0 : o.badge_color) ?? "#ffa502",
      title: r((a = this.config) == null ? void 0 : a.title, "Flash Sale"),
      promo_text: r((d = this.config) == null ? void 0 : d.promo_text, "Limited time offer"),
      button_text: r((p = this.config) == null ? void 0 : p.button_text, "Shop Now"),
      button_link: ((f = this.config) == null ? void 0 : f.button_link) ?? "#",
      discount: r((b = this.config) == null ? void 0 : b.discount, ""),
      end_time: i
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.updateTimer(), this.startTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopTimer();
  }
  startTimer() {
    this.timerId === null && (this.timerId = window.setInterval(() => this.updateTimer(), 1e3));
  }
  stopTimer() {
    this.timerId !== null && (clearInterval(this.timerId), this.timerId = null);
  }
  updateTimer() {
    const t = this.cfg.end_time - Date.now();
    if (t <= 0) {
      this.timerState = { hours: 0, minutes: 0, seconds: 0 }, this.stopTimer();
      return;
    }
    const i = Math.floor(t / 1e3);
    this.timerState = {
      hours: Math.floor(i / 3600) % 24,
      minutes: Math.floor(i % 3600 / 60),
      seconds: i % 60
    }, this.requestUpdate();
  }
  pad(t) {
    return String(t).padStart(2, "0");
  }
  render() {
    var s, o, a;
    const t = this.cfg, i = r((s = this.config) == null ? void 0 : s.label_hours, "ساعة"), n = r((o = this.config) == null ? void 0 : o.label_minutes, "دقيقة"), e = r((a = this.config) == null ? void 0 : a.label_seconds, "ثانية");
    return h`
      <style>
        .fsb-container { position:relative; width:100%; min-height:300px; display:flex; align-items:center; justify-content:center; background:${t.background}; background-size:cover; background-position:center; overflow:hidden; border-radius:8px; box-shadow:0 10px 40px rgba(0,0,0,0.2); }
        .fsb-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.3); z-index:1; }
        .fsb-content { position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px; text-align:center; gap:20px; width:100%; }
        .fsb-badge { position:absolute; top:20px; right:20px; background:${t.badge_color}; color:#000; width:80px; height:80px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:28px; font-weight:bold; z-index:3; animation:fsb-pulse 2s ease-in-out infinite; }
        .fsb-title { font-size:clamp(28px,8vw,56px); font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:3px; text-shadow:0 4px 8px rgba(0,0,0,0.3); }
        .fsb-promo { font-size:clamp(14px,3vw,18px); color:rgba(255,255,255,0.95); font-weight:300; letter-spacing:1px; }
        .fsb-timer { display:flex; gap:15px; justify-content:center; flex-wrap:wrap; }
        .fsb-unit { display:flex; flex-direction:column; align-items:center; gap:8px; }
        .fsb-box { background:rgba(255,255,255,0.15); backdrop-filter:blur(10px); border:2px solid rgba(255,255,255,0.3); border-radius:8px; width:70px; height:70px; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:bold; color:${t.primary_color}; }
        .fsb-label { font-size:11px; text-transform:uppercase; letter-spacing:2px; color:rgba(255,255,255,0.8); font-weight:600; }
        .fsb-btn { padding:14px 44px; font-size:16px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; background:${t.primary_color}; color:#fff; border:none; border-radius:8px; cursor:pointer; text-decoration:none; display:inline-block; transition:transform 0.2s,box-shadow 0.2s; }
        .fsb-btn:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,0.3); }
        @keyframes fsb-pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.1); } }
        @media (max-width:480px) { .fsb-box { width:56px; height:56px; font-size:22px; } }
      </style>
      <div class="fsb-container" role="region" aria-label="${t.title}">
        <div class="fsb-overlay" aria-hidden="true"></div>
        <div class="fsb-content">
          ${t.discount ? h`<div class="fsb-badge" aria-label="خصم ${t.discount}">${t.discount}</div>` : ""}
          <h1 class="fsb-title">${t.title}</h1>
          <p class="fsb-promo">${t.promo_text}</p>
          <div class="fsb-timer" role="timer" aria-label="العداد التنازلي">
            <div class="fsb-unit"><div class="fsb-box">${this.pad(this.timerState.hours)}</div><span class="fsb-label">${i}</span></div>
            <div class="fsb-unit"><div class="fsb-box">${this.pad(this.timerState.minutes)}</div><span class="fsb-label">${n}</span></div>
            <div class="fsb-unit"><div class="fsb-box">${this.pad(this.timerState.seconds)}</div><span class="fsb-label">${e}</span></div>
          </div>
          <a class="fsb-btn" href="${t.button_link}">${t.button_text}</a>
        </div>
      </div>
    `;
  }
}
u([
  m({ type: Object })
], l.prototype, "config");
u([
  g()
], l.prototype, "timerState");
typeof l < "u" && l.registerSallaComponent("salla-flash-sale-banners");
export {
  l as FlashSaleBanner
};
