import { LitElement as x, html as b } from "lit";
import { property as h, state as m } from "lit/decorators.js";
var g = Object.defineProperty, u = (o, t, i, a) => {
  for (var e = void 0, s = o.length - 1, r; s >= 0; s--)
    (r = o[s]) && (e = r(t, i, e) || e);
  return e && g(t, i, e), e;
};
class n extends x {
  constructor() {
    super(...arguments), this.timerState = { hours: 0, minutes: 0, seconds: 0 }, this.timerId = null;
  }
  createRenderRoot() {
    return this;
  }
  get cfg() {
    var a, e, s, r, l, c, d, p, f;
    const t = (a = this.config) == null ? void 0 : a.expiration_date, i = t ? new Date(t).getTime() : Date.now() + 36e5;
    return {
      background: ((e = this.config) == null ? void 0 : e.background) ?? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      primary_color: ((s = this.config) == null ? void 0 : s.primary_color) ?? "#ff4757",
      badge_color: ((r = this.config) == null ? void 0 : r.badge_color) ?? "#ffa502",
      title: ((l = this.config) == null ? void 0 : l.title) ?? "Flash Sale",
      promo_text: ((c = this.config) == null ? void 0 : c.promo_text) ?? "Limited time offer",
      button_text: ((d = this.config) == null ? void 0 : d.button_text) ?? "Shop Now",
      button_link: ((p = this.config) == null ? void 0 : p.button_link) ?? "#",
      discount: ((f = this.config) == null ? void 0 : f.discount) ?? "",
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
    const t = this.cfg;
    return b`
      <style>
        .fsb-container {
          position: relative; width: 100%; min-height: 300px;
          display: flex; align-items: center; justify-content: center;
          background: ${t.background}; background-size: cover; background-position: center;
          overflow: hidden; border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        .fsb-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); z-index: 1; }
        .fsb-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; text-align: center; gap: 20px; width: 100%; }
        .fsb-badge { position: absolute; top: 20px; right: 20px; background: ${t.badge_color}; color: #000; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold; z-index: 3; animation: fsb-pulse 2s ease-in-out infinite; }
        .fsb-title { font-size: clamp(28px,8vw,56px); font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: 3px; text-shadow: 0 4px 8px rgba(0,0,0,0.3); }
        .fsb-promo { font-size: clamp(14px,3vw,18px); color: rgba(255,255,255,0.95); font-weight: 300; letter-spacing: 1px; }
        .fsb-timer { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }
        .fsb-unit { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .fsb-box { background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; color: ${t.primary_color}; }
        .fsb-label { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.8); font-weight: 600; }
        .fsb-btn { padding: 14px 44px; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; background: ${t.primary_color}; color: #fff; border: none; border-radius: 8px; cursor: pointer; text-decoration: none; display: inline-block; transition: transform 0.2s, box-shadow 0.2s; }
        .fsb-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
        @keyframes fsb-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
      </style>
      <div class="fsb-container">
        <div class="fsb-overlay"></div>
        <div class="fsb-content">
          ${t.discount ? b`<div class="fsb-badge">${t.discount}</div>` : ""}
          <h1 class="fsb-title">${t.title}</h1>
          <p class="fsb-promo">${t.promo_text}</p>
          <div class="fsb-timer">
            <div class="fsb-unit"><div class="fsb-box">${this.pad(this.timerState.hours)}</div><span class="fsb-label">ساعة</span></div>
            <div class="fsb-unit"><div class="fsb-box">${this.pad(this.timerState.minutes)}</div><span class="fsb-label">دقيقة</span></div>
            <div class="fsb-unit"><div class="fsb-box">${this.pad(this.timerState.seconds)}</div><span class="fsb-label">ثانية</span></div>
          </div>
          <a class="fsb-btn" href="${t.button_link}">${t.button_text}</a>
        </div>
      </div>
    `;
  }
}
u([
  h({ type: Object })
], n.prototype, "config");
u([
  m()
], n.prototype, "timerState");
typeof n < "u" && n.registerSallaComponent("salla-flash-sale-banners");
export {
  n as FlashSaleBanner
};
