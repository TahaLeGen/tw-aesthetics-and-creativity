import { LitElement as S, html as w } from "lit";
import { property as M, state as l } from "lit/decorators.js";
var G = Object.defineProperty, n = (h, t, i, a) => {
  for (var e = void 0, o = h.length - 1, s; o >= 0; o--)
    (s = h[o]) && (e = s(t, i, e) || e);
  return e && G(t, i, e), e;
};
class r extends S {
  constructor() {
    super(...arguments), this.attemptsUsed = 0, this.currentRotation = 0, this.isSpinning = !1, this.feedbackMessage = "العب واربح هديتك المميزة!", this.isGameOver = !1, this.pointerTilting = !1, this.wonPromoCode = "";
  }
  createRenderRoot() {
    return this;
  }
  get cfg() {
    var o, s, c;
    const t = (o = this.config) == null ? void 0 : o.max_attempts;
    console.log("[lucky-wheel] raw max_attempts:", JSON.stringify(t), typeof t), console.log("[lucky-wheel] full config:", JSON.stringify(this.config));
    const i = Number(typeof t == "object" && t !== null ? t.value : t ?? 3), a = (s = this.config) == null ? void 0 : s.sections, e = Array.isArray(a) ? a : [
      { id: 1, color: "#16a085", label: "فضي", isGift: !1 },
      { id: 2, color: "#2980b9", label: "شارة", isGift: !1 },
      { id: 3, color: "#34495e", label: "مجاني", isGift: !1 },
      { id: 4, color: "#f39c12", label: "غموض", isGift: !1 },
      { id: 5, color: "#d35400", label: "جائزة", isGift: !0, promoCode: "WINNER2024" },
      { id: 6, color: "#c0392b", label: "طاقة", isGift: !1 }
    ];
    return {
      background: ((c = this.config) == null ? void 0 : c.background) ?? "radial-gradient(circle at 50% 0%, #2c3e50 0%, #0f171e 100%)",
      max_attempts: i,
      sections: e
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
    const t = this.cfg.sections, i = 360 * 6, a = Math.floor(Math.random() * 360);
    this.currentRotation += i + a;
    const e = (360 - this.currentRotation % 360) % 360, o = 360 / t.length, s = t[Math.floor(e / o)];
    setTimeout(() => {
      this.pointerTilting = !1, this.isSpinning = !1, this.resolvePrize(s);
    }, 5e3);
  }
  resolvePrize(t) {
    t.isGift ? (this.isGameOver = !0, this.wonPromoCode = t.promoCode || "", this.feedbackMessage = `🎉 مبروك! لقد فزت بـ: ${t.label}!`, localStorage.setItem("spin_wheel_gift_won", "true"), localStorage.setItem("spin_wheel_promo_code", this.wonPromoCode)) : this.attemptsUsed >= this.cfg.max_attempts ? (this.isGameOver = !0, this.feedbackMessage = `❌ انتهت المحاولات. حصلت على ${t.label}.`) : this.feedbackMessage = `حصلت على ${t.label}. حاول مجدداً!`;
  }
  buildWheelSVG(t) {
    const o = t.length, s = 2 * Math.PI / o, c = 140 * 0.62;
    let p = "";
    for (let d = 0; d < o; d++) {
      const f = d * s - Math.PI / 2, m = f + s, x = 140 + 140 * Math.cos(f), y = 140 + 140 * Math.sin(f), v = 140 + 140 * Math.cos(m), k = 140 + 140 * Math.sin(m), $ = s > Math.PI ? 1 : 0;
      p += `<path d="M140,140 L${x},${y} A140,140 0 ${$},1 ${v},${k} Z" fill="${t[d].color}" stroke="#fff" stroke-width="2"/>`;
      const g = f + s / 2, b = 140 + c * Math.cos(g), u = 140 + c * Math.sin(g), _ = g * 180 / Math.PI + 90;
      p += `<text x="${b}" y="${u}" transform="rotate(${_},${b},${u})" text-anchor="middle" dominant-baseline="middle" font-size="14" font-weight="800" font-family="Segoe UI,Tahoma,Arial,sans-serif" fill="white">${t[d].label}</text>`;
    }
    return p += '<circle cx="140" cy="140" r="140" fill="none" stroke="white" stroke-width="6"/>', p;
  }
  render() {
    const { sections: t, max_attempts: i, background: a } = this.cfg, e = this.isGameOver || this.isSpinning;
    return w`
      <style>
        .lw-host { font-family: system-ui,-apple-system,sans-serif; background: ${a}; padding: 2.5rem 1.25rem; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.4); max-width: 400px; margin: 20px auto; color: #ffffff; display: block; }
        .lw-wrapper { display: flex; flex-direction: column; align-items: center; position: relative; }
        .lw-frame { width: 280px; height: 280px; border-radius: 50%; position: relative; box-shadow: 0 0 24px rgba(0,0,0,0.4); }
        .lw-svg { width: 280px; height: 280px; border-radius: 50%; display: block; transition: transform 5s cubic-bezier(0.15,0.95,0.35,1); }
        .lw-hub { width: 76px; height: 76px; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); border-radius: 50%; background: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); z-index: 50; cursor: pointer; user-select: none; transition: transform 0.1s ease; border: none; outline: none; }
        .lw-hub::after { content: "دوّر"; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; color: #2c3e50; }
        .lw-hub::before { content: ""; position: absolute; width: 0; height: 0; border-style: solid; border-width: 0 14px 22px 14px; border-color: transparent transparent #ffffff transparent; top: -14px; left: 24px; }
        .lw-hub:hover:not(.lw-hub--disabled) { transform: translate(-50%,-50%) scale(1.04); }
        .lw-hub:active:not(.lw-hub--disabled) { transform: translate(-50%,-50%) scale(0.96); }
        .lw-hub--disabled { background: #e0e0e0; cursor: not-allowed; }
        .lw-hub--disabled::after { color: #95a5a6; }
        .lw-hub--disabled::before { border-color: transparent transparent #e0e0e0 transparent; }
        @keyframes lw-tilt { 0%,100% { transform: translate(-50%,-50%) rotate(0deg); } 50% { transform: translate(-50%,-50%) rotate(6deg); } }
        .lw-hub--tilting { animation: lw-tilt 0.1s ease-in-out infinite; }
        .lw-dashboard { margin-top: 1.5rem; text-align: center; width: 100%; }
        .lw-feedback { font-size: 1rem; font-weight: 500; color: #ecf0f1; margin-bottom: 0.5rem; min-height: 1.5rem; }
        .lw-badge { display: inline-block; padding: 6px 14px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; font-size: 13px; color: #bdc3c7; }
        .lw-badge strong { color: #f1c40f; font-weight: bold; }
        .lw-promo { margin-top: 1.25rem; padding: 1rem 1.5rem; background: linear-gradient(135deg,rgba(241,196,15,0.15),rgba(243,156,18,0.1)); border: 1px solid rgba(241,196,15,0.4); border-radius: 14px; text-align: center; }
        .lw-promo-label { font-size: 0.8rem; color: rgba(255,255,255,0.6); margin-bottom: 0.5rem; }
        .lw-promo-code { font-size: 1.5rem; font-weight: 900; color: #f1c40f; letter-spacing: 0.15em; cursor: pointer; user-select: all; padding: 0.4rem 1rem; background: rgba(0,0,0,0.25); border-radius: 8px; display: inline-block; transition: background 0.2s; }
        .lw-promo-code:hover { background: rgba(0,0,0,0.4); }
        .lw-copy-hint { font-size: 0.72rem; color: rgba(255,255,255,0.4); margin-top: 0.4rem; }
      </style>

      <div class="lw-host" dir="rtl">
        <div class="lw-wrapper">
          <div class="lw-frame" style="position:relative;">
            <svg class="lw-svg" viewBox="0 0 280 280"
                 style="transform: rotate(${this.currentRotation}deg);"
                 .innerHTML="${this.buildWheelSVG(t)}">
            </svg>
            <button class="lw-hub ${e ? "lw-hub--disabled" : ""} ${this.pointerTilting ? "lw-hub--tilting" : ""}"
                    @click="${this.spin}" ?disabled="${e}">
            </button>
          </div>
          <div class="lw-dashboard">
            <div class="lw-feedback">${this.feedbackMessage}</div>
            <div class="lw-badge">المحاولات: <strong>${i - this.attemptsUsed}</strong> / ${i} متبقية</div>
            ${this.wonPromoCode ? w`
              <div class="lw-promo">
                <div class="lw-promo-label">كود الخصم الخاص بك</div>
                <div class="lw-promo-code" @click="${() => {
      var o;
      return (o = navigator.clipboard) == null ? void 0 : o.writeText(this.wonPromoCode);
    }}">${this.wonPromoCode}</div>
                <div class="lw-copy-hint">اضغط للنسخ</div>
              </div>
            ` : ""}
          </div>
        </div>
      </div>
    `;
  }
}
n([
  M({ type: Object })
], r.prototype, "config");
n([
  l()
], r.prototype, "attemptsUsed");
n([
  l()
], r.prototype, "currentRotation");
n([
  l()
], r.prototype, "isSpinning");
n([
  l()
], r.prototype, "feedbackMessage");
n([
  l()
], r.prototype, "isGameOver");
n([
  l()
], r.prototype, "pointerTilting");
n([
  l()
], r.prototype, "wonPromoCode");
typeof r < "u" && r.registerSallaComponent("salla-lucky-wheel");
export {
  r as LuckySpinWheel
};
