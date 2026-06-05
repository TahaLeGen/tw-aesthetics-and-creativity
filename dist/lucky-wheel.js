import { LitElement as z, svg as k, html as _ } from "lit";
import { property as I, state as d } from "lit/decorators.js";
import { r as O, l as c } from "./i18n-P4yXTTHR.js";
var A = Object.defineProperty, a = (u, t, e, n) => {
  for (var o = void 0, s = u.length - 1, r; s >= 0; s--)
    (r = u[s]) && (o = r(t, e, o) || o);
  return o && A(t, e, o), o;
};
class i extends z {
  constructor() {
    super(...arguments), this.attemptsUsed = 0, this.currentRotation = 0, this.isSpinning = !1, this.feedbackMessage = "العب واربح هديتك المميزة!", this.isGameOver = !1, this.pointerTilting = !1, this.wonPromoCode = "";
  }
  createRenderRoot() {
    return this;
  }
  get cfg() {
    var o, s, r;
    const t = O((o = this.config) == null ? void 0 : o.max_attempts, 3), e = (s = this.config) == null ? void 0 : s.sections, n = Array.isArray(e) ? e : [
      { id: 1, color: "#16a085", label: "فضي", isGift: !1 },
      { id: 2, color: "#2980b9", label: "شارة", isGift: !1 },
      { id: 3, color: "#34495e", label: "مجاني", isGift: !1 },
      { id: 4, color: "#f39c12", label: "غموض", isGift: !1 },
      { id: 5, color: "#d35400", label: "جائزة", isGift: !0, promoCode: "WINNER2024" },
      { id: 6, color: "#c0392b", label: "طاقة", isGift: !1 }
    ];
    return {
      background: ((r = this.config) == null ? void 0 : r.background) ?? "radial-gradient(circle at 50% 0%, #2c3e50 0%, #0f171e 100%)",
      max_attempts: t,
      sections: n
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.restoreState();
  }
  restoreState() {
    const t = localStorage.getItem("spin_wheel_attempts_used");
    t && (this.attemptsUsed = parseInt(t, 10)), localStorage.getItem("spin_wheel_gift_won") === "true" ? (this.isGameOver = !0, this.wonPromoCode = localStorage.getItem("spin_wheel_promo_code") || "", this.feedbackMessage = "✨ لقد فزت بهديتك المميزة من قبل!") : this.attemptsUsed >= this.cfg.max_attempts && (this.isGameOver = !0, this.feedbackMessage = "❌ لا محاولات متبقية.");
  }
  spin() {
    if (this.isSpinning || this.isGameOver) return;
    this.isSpinning = !0, this.pointerTilting = !0, this.attemptsUsed += 1, localStorage.setItem("spin_wheel_attempts_used", String(this.attemptsUsed));
    const t = this.cfg.sections, e = Math.floor(Math.random() * 360);
    this.currentRotation += 360 * 6 + e;
    const n = (360 - this.currentRotation % 360) % 360, o = 360 / t.length, s = t[Math.floor(n / o)];
    setTimeout(() => {
      this.pointerTilting = !1, this.isSpinning = !1, this.resolvePrize(s);
    }, 5e3);
  }
  resolvePrize(t) {
    const e = c(t.label);
    t.isGift ? (this.isGameOver = !0, this.wonPromoCode = t.promoCode || "", this.feedbackMessage = `🎉 مبروك! لقد فزت بـ: ${e}!`, localStorage.setItem("spin_wheel_gift_won", "true"), localStorage.setItem("spin_wheel_promo_code", this.wonPromoCode)) : this.attemptsUsed >= this.cfg.max_attempts ? (this.isGameOver = !0, this.feedbackMessage = `❌ انتهت المحاولات. حصلت على ${e}.`) : this.feedbackMessage = `حصلت على ${e}. حاول مجدداً!`;
  }
  /** Safe SVG wheel using Lit svg`` tagged template — no innerHTML */
  renderWheel(t) {
    const s = t.length, r = 2 * Math.PI / s, h = 140 * 0.62, x = t.map((f, m) => {
      const l = m * r - Math.PI / 2, p = l + r, g = 140 + 140 * Math.cos(l), b = 140 + 140 * Math.sin(l), w = 140 + 140 * Math.cos(p), M = 140 + 140 * Math.sin(p), S = r > Math.PI ? 1 : 0, P = `M140,140 L${g},${b} A140,140 0 ${S},1 ${w},${M} Z`, v = l + r / 2, y = 140 + h * Math.cos(v), $ = 140 + h * Math.sin(v), C = v * 180 / Math.PI + 90, G = c(f.label);
      return k`
        <path d="${P}" fill="${f.color}" stroke="#fff" stroke-width="2"></path>
        <text
          x="${y}" y="${$}"
          transform="rotate(${C},${y},${$})"
          text-anchor="middle"
          dominant-baseline="middle"
          font-size="14"
          font-weight="800"
          font-family="Segoe UI,Tahoma,Arial,sans-serif"
          fill="white"
        >${G}</text>
      `;
    });
    return k`
      <svg class="lw-svg" viewBox="0 0 280 280"
           style="transform: rotate(${this.currentRotation}deg);"
           role="img" aria-label="عجلة الحظ">
        ${x}
        <circle cx="${140}" cy="${140}" r="${140}" fill="none" stroke="white" stroke-width="6"></circle>
      </svg>
    `;
  }
  render() {
    var m, l, p, g, b;
    const { sections: t, max_attempts: e, background: n } = this.cfg, o = c((m = this.config) == null ? void 0 : m.label_spin, "دوّر"), s = c((l = this.config) == null ? void 0 : l.label_attempts, "المحاولات"), r = c((p = this.config) == null ? void 0 : p.label_remaining, "متبقية"), h = c((g = this.config) == null ? void 0 : g.label_promo, "كود الخصم الخاص بك"), x = c((b = this.config) == null ? void 0 : b.label_copy, "اضغط للنسخ"), f = this.isGameOver || this.isSpinning;
    return _`
      <style>
        .lw-host { font-family:system-ui,-apple-system,sans-serif; background:${n}; padding:2.5rem 1.25rem; border-radius:24px; box-shadow:0 20px 50px rgba(0,0,0,0.4); max-width:400px; margin:20px auto; color:#ffffff; display:block; }
        .lw-wrapper { display:flex; flex-direction:column; align-items:center; position:relative; }
        .lw-frame { width:280px; height:280px; border-radius:50%; position:relative; box-shadow:0 0 24px rgba(0,0,0,0.4); }
        .lw-svg { width:280px; height:280px; border-radius:50%; display:block; transition:transform 5s cubic-bezier(0.15,0.95,0.35,1); }
        .lw-hub { width:76px; height:76px; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:50%; background:#ffffff; box-shadow:0 4px 10px rgba(0,0,0,0.3); z-index:50; cursor:pointer; user-select:none; transition:transform 0.1s ease; border:none; outline:none; font-weight:800; font-size:13px; color:#2c3e50; }
        .lw-hub::before { content:""; position:absolute; width:0; height:0; border-style:solid; border-width:0 14px 22px 14px; border-color:transparent transparent #ffffff transparent; top:-14px; left:50%; transform:translateX(-50%); }
        .lw-hub:hover:not(:disabled) { transform:translate(-50%,-50%) scale(1.04); }
        .lw-hub:active:not(:disabled) { transform:translate(-50%,-50%) scale(0.96); }
        .lw-hub:disabled { background:#e0e0e0; cursor:not-allowed; color:#95a5a6; }
        .lw-hub:disabled::before { border-color:transparent transparent #e0e0e0 transparent; }
        @keyframes lw-tilt { 0%,100% { transform:translate(-50%,-50%) rotate(0deg); } 50% { transform:translate(-50%,-50%) rotate(6deg); } }
        .lw-hub--tilting { animation:lw-tilt 0.1s ease-in-out infinite; }
        .lw-dashboard { margin-top:1.5rem; text-align:center; width:100%; }
        .lw-feedback { font-size:1rem; font-weight:500; color:#ecf0f1; margin-bottom:0.5rem; min-height:1.5rem; }
        .lw-badge { display:inline-block; padding:6px 14px; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); border-radius:20px; font-size:13px; color:#bdc3c7; }
        .lw-badge strong { color:#f1c40f; font-weight:bold; }
        .lw-promo { margin-top:1.25rem; padding:1rem 1.5rem; background:linear-gradient(135deg,rgba(241,196,15,0.15),rgba(243,156,18,0.1)); border:1px solid rgba(241,196,15,0.4); border-radius:14px; text-align:center; }
        .lw-promo-label { font-size:0.8rem; color:rgba(255,255,255,0.6); margin-bottom:0.5rem; }
        .lw-promo-code { font-size:1.5rem; font-weight:900; color:#f1c40f; letter-spacing:0.15em; cursor:pointer; user-select:all; padding:0.4rem 1rem; background:rgba(0,0,0,0.25); border-radius:8px; display:inline-block; transition:background 0.2s; border:none; }
        .lw-promo-code:hover { background:rgba(0,0,0,0.4); }
        .lw-copy-hint { font-size:0.72rem; color:rgba(255,255,255,0.4); margin-top:0.4rem; }
      </style>

      <div class="lw-host" dir="rtl">
        <div class="lw-wrapper">
          <div class="lw-frame" style="position:relative;">
            ${this.renderWheel(t)}
            <button
              class="lw-hub ${this.pointerTilting ? "lw-hub--tilting" : ""}"
              aria-label="${o}"
              ?disabled="${f}"
              @click="${this.spin}">
              ${o}
            </button>
          </div>
          <div class="lw-dashboard" role="status" aria-live="polite">
            <div class="lw-feedback">${this.feedbackMessage}</div>
            <div class="lw-badge">${s}: <strong>${e - this.attemptsUsed}</strong> / ${e} ${r}</div>
            ${this.wonPromoCode ? _`
              <div class="lw-promo">
                <div class="lw-promo-label">${h}</div>
                <button class="lw-promo-code" aria-label="نسخ الكود ${this.wonPromoCode}" @click="${() => {
      var w;
      return (w = navigator.clipboard) == null ? void 0 : w.writeText(this.wonPromoCode);
    }}">${this.wonPromoCode}</button>
                <div class="lw-copy-hint">${x}</div>
              </div>
            ` : ""}
          </div>
        </div>
      </div>
    `;
  }
}
a([
  I({ type: Object })
], i.prototype, "config");
a([
  d()
], i.prototype, "attemptsUsed");
a([
  d()
], i.prototype, "currentRotation");
a([
  d()
], i.prototype, "isSpinning");
a([
  d()
], i.prototype, "feedbackMessage");
a([
  d()
], i.prototype, "isGameOver");
a([
  d()
], i.prototype, "pointerTilting");
a([
  d()
], i.prototype, "wonPromoCode");
typeof i < "u" && i.registerSallaComponent("salla-lucky-wheel");
export {
  i as LuckySpinWheel
};
