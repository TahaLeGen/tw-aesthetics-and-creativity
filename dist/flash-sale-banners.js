var L = Object.create;
var k = Object.defineProperty;
var R = Object.getOwnPropertyDescriptor;
var Y = (t, e) => (e = Symbol[t]) ? e : Symbol.for("Symbol." + t), h = (t) => {
  throw TypeError(t);
};
var q = (t, e, i) => e in t ? k(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var S = (t, e) => k(t, "name", { value: e, configurable: !0 });
var j = (t) => [, , , L((t == null ? void 0 : t[Y("metadata")]) ?? null)], N = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], b = (t) => t !== void 0 && typeof t != "function" ? h("Function expected") : t, G = (t, e, i, a, r) => ({ kind: N[t], name: e, metadata: a, addInitializer: (n) => i._ ? h("Already initialized") : r.push(b(n || null)) }), J = (t, e) => q(e, Y("metadata"), t[3]), U = (t, e, i, a) => {
  for (var r = 0, n = t[e >> 1], c = n && n.length; r < c; r++) e & 1 ? n[r].call(i) : a = n[r].call(i, a);
  return a;
}, M = (t, e, i, a, r, n) => {
  var c, p, T, x, g, o = e & 7, f = !!(e & 8), l = !!(e & 16), v = o > 3 ? t.length + 1 : o ? f ? 1 : 2 : 0, $ = N[o + 5], I = o > 3 && (t[v - 1] = []), H = t[v] || (t[v] = []), d = o && (!l && !f && (r = r.prototype), o < 5 && (o > 3 || !l) && R(o < 4 ? r : { get [i]() {
    return D(this, n);
  }, set [i](s) {
    return E(this, n, s);
  } }, i));
  o ? l && o < 4 && S(n, (o > 2 ? "set " : o > 1 ? "get " : "") + i) : S(r, i);
  for (var w = a.length - 1; w >= 0; w--)
    x = G(o, i, T = {}, t[3], H), o && (x.static = f, x.private = l, g = x.access = { has: l ? (s) => K(r, s) : (s) => i in s }, o ^ 3 && (g.get = l ? (s) => (o ^ 1 ? D : O)(s, r, o ^ 4 ? n : d.get) : (s) => s[i]), o > 2 && (g.set = l ? (s, y) => E(s, r, y, o ^ 4 ? n : d.set) : (s, y) => s[i] = y)), p = (0, a[w])(o ? o < 4 ? l ? n : d[$] : o > 4 ? void 0 : { get: d.get, set: d.set } : r, x), T._ = 1, o ^ 4 || p === void 0 ? b(p) && (o > 4 ? I.unshift(p) : o ? l ? n = p : d[$] = p : r = p) : typeof p != "object" || p === null ? h("Object expected") : (b(c = p.get) && (d.get = c), b(c = p.set) && (d.set = c), b(c = p.init) && I.unshift(c));
  return o || J(t, r), d && k(r, i, d), l ? o ^ 4 ? n : d : r;
};
var C = (t, e, i) => e.has(t) || h("Cannot " + i), K = (t, e) => Object(e) !== e ? h('Cannot use the "in" operator on this value') : t.has(e), D = (t, e, i) => (C(t, e, "read from private field"), i ? i.call(t) : e.get(t));
var E = (t, e, i, a) => (C(t, e, "write to private field"), a ? a.call(t, i) : e.set(t, i), i), O = (t, e, i) => (C(t, e, "access private method"), i);
import { LitElement as Q, css as V, html as A } from "lit";
import { customElement as W } from "lit/decorators.js";
var P, z, X;
P = [W("flash-sale-banner")];
let m = class m extends (X = Q) {
  constructor() {
    super(...arguments), this.title = "Flash Sale", this.promoText = "Limited time offer", this.buttonText = "Shop Now", this.discount = "-50%", this.backgroundColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", this.endTime = Date.now() + 36e5, this.primaryColor = "#ff4757", this.badgeColor = "#ffa502", this.timerState = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }, this.timerId = null;
  }
  // Lifecycle methods
  connectedCallback() {
    super.connectedCallback(), this.updateTimer(), this.startTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopTimer();
  }
  // Timer management
  startTimer() {
    this.timerId === null && (this.timerId = window.setInterval(() => {
      this.updateTimer();
    }, 1e3));
  }
  stopTimer() {
    this.timerId !== null && (clearInterval(this.timerId), this.timerId = null);
  }
  updateTimer() {
    const e = Date.now(), i = this.endTime - e;
    if (i <= 0) {
      this.timerState = { hours: 0, minutes: 0, seconds: 0 }, this.stopTimer(), this.dispatchEvent(
        new CustomEvent("timer-expired", {
          detail: { expired: !0 },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    const a = Math.floor(i / 1e3);
    this.timerState = {
      hours: Math.floor(a / 3600) % 24,
      minutes: Math.floor(a % 3600 / 60),
      seconds: a % 60
    }, this.requestUpdate();
  }
  // Event handlers
  handleButtonClick() {
    this.dispatchEvent(
      new CustomEvent("cta-clicked", {
        detail: { timestamp: Date.now() },
        bubbles: !0,
        composed: !0
      })
    );
  }
  // Helper method for zero-padding numbers
  padNumber(e) {
    return String(e).padStart(2, "0");
  }
  render() {
    return A`
      <div class="banner-container" style="--banner-bg: ${this.backgroundColor}; --primary-color: ${this.primaryColor}; --badge-color: ${this.badgeColor};">
        <div class="banner-overlay"></div>
        <div class="banner-content">
          ${this.discount ? A`<div class="discount-badge">${this.discount}</div>` : null}

          <h1 class="headline">${this.title}</h1>

          <p class="promo-text">${this.promoText}</p>

          <div class="timer-container">
            <div class="timer-unit">
              <div class="timer-box">${this.padNumber(this.timerState.hours)}</div>
              <span class="timer-label">Hours</span>
            </div>
            <div class="timer-unit">
              <div class="timer-box">${this.padNumber(this.timerState.minutes)}</div>
              <span class="timer-label">Minutes</span>
            </div>
            <div class="timer-unit">
              <div class="timer-box">${this.padNumber(this.timerState.seconds)}</div>
              <span class="timer-label">Seconds</span>
            </div>
          </div>

          <button class="cta-button" @click="${this.handleButtonClick}">
            ${this.buttonText}
          </button>
        </div>
      </div>
    `;
  }
};
z = j(X), m = M(z, 0, "FlashSaleBanner", P, m), m.styles = V`
    :host {
      --primary-color: #ff4757;
      --secondary-color: #2f3542;
      --text-color: #ffffff;
      --badge-color: #ffa502;
      --hover-scale: 1.05;
      --transition-duration: 300ms;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .banner-container {
      position: relative;
      width: 100%;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--banner-bg, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
      background-size: cover;
      background-position: center;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }

    /* Animated background overlay */
    .banner-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 1;
      animation: fadeIn 0.6s ease-in;
    }

    /* Content wrapper */
    .banner-content {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      text-align: center;
      gap: 20px;
    }

    /* Discount badge */
    .discount-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      background: var(--badge-color);
      color: #000;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: bold;
      z-index: 3;
      box-shadow: 0 5px 15px rgba(255, 165, 2, 0.3);
      animation: pulse 2s ease-in-out infinite;
    }

    /* Headline styling */
    .headline {
      font-size: clamp(28px, 8vw, 56px);
      font-weight: 900;
      color: var(--text-color);
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 10px;
      animation: slideDown 0.6s ease-out;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    /* Promotional text */
    .promo-text {
      font-size: clamp(14px, 3vw, 18px);
      color: var(--text-color);
      font-weight: 300;
      letter-spacing: 1px;
      margin-bottom: 30px;
      animation: slideUp 0.6s ease-out 0.2s both;
      opacity: 0.95;
    }

    /* Timer container */
    .timer-container {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 30px;
      animation: slideUp 0.6s ease-out 0.4s both;
    }

    .timer-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .timer-box {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: bold;
      color: var(--primary-color);
      transition: all var(--transition-duration) ease;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
      animation: timerPulse 1s ease-in-out infinite;
    }

    .timer-box:hover {
      transform: scale(var(--hover-scale));
      border-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 8px 32px rgba(255, 71, 87, 0.5);
    }

    .timer-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 600;
    }

    /* Responsive timer sizes */
    @media (max-width: 600px) {
      .timer-box {
        width: 60px;
        height: 60px;
        font-size: 24px;
      }

      .timer-label {
        font-size: 10px;
      }
    }

    /* CTA Button */
    .cta-button {
      padding: 16px 48px;
      font-size: clamp(14px, 2.5vw, 18px);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      background: var(--primary-color);
      color: var(--text-color);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all var(--transition-duration) ease;
      box-shadow: 0 8px 24px rgba(255, 71, 87, 0.4);
      animation: slideUp 0.6s ease-out 0.6s both;
      position: relative;
      overflow: hidden;
    }

    .cta-button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .cta-button:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(255, 71, 87, 0.6);
      background: #ff3838;
    }

    .cta-button:hover::before {
      width: 400px;
      height: 400px;
    }

    .cta-button:active {
      transform: translateY(-2px);
    }

    /* Animations */
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulse {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    @keyframes timerPulse {
      0%,
      100% {
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
      }
      50% {
        box-shadow: 0 8px 32px rgba(255, 71, 87, 0.3);
      }
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .banner-container {
        min-height: 280px;
      }

      .banner-content {
        padding: 30px 15px;
        gap: 15px;
      }

      .discount-badge {
        width: 70px;
        height: 70px;
        font-size: 22px;
        top: 15px;
        right: 15px;
      }

      .timer-container {
        gap: 10px;
        margin-bottom: 20px;
      }

      .promo-text {
        margin-bottom: 20px;
      }
    }

    @media (max-width: 480px) {
      .banner-container {
        min-height: 250px;
        border-radius: 4px;
      }

      .banner-content {
        padding: 20px 10px;
        gap: 12px;
      }

      .discount-badge {
        width: 60px;
        height: 60px;
        font-size: 18px;
        top: 10px;
        right: 10px;
      }

      .cta-button {
        padding: 12px 36px;
      }

      .timer-container {
        gap: 8px;
        margin-bottom: 15px;
      }
    }
  `, U(z, 1, m);
let u = m;
typeof u < "u" && u.registerSallaComponent("salla-flash-sale-banners");
export {
  u as FlashSaleBanner
};
