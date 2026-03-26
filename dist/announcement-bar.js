var f = Object.defineProperty;
var b = (n, e, t) => e in n ? f(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var r = (n, e, t) => b(n, typeof e != "symbol" ? e + "" : e, t);
import { LitElement as m, css as u, html as d } from "lit";
import { property as h, state as p } from "lit/decorators.js";
var v = Object.defineProperty, o = (n, e, t, c) => {
  for (var i = void 0, a = n.length - 1, l; a >= 0; a--)
    (l = n[a]) && (i = l(e, t, i) || i);
  return i && v(e, t, i), i;
};
class s extends m {
  constructor() {
    super(...arguments);
    r(this, "config");
    r(this, "visible", !0);
    r(this, "secondsLeft", 60 * 60 * 24);
    // مثال: عداد يوم كامل
    r(this, "timerInterval");
  }
  connectedCallback() {
    super.connectedCallback(), this.startTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.timerInterval && clearInterval(this.timerInterval);
  }
  startTimer() {
    this.timerInterval = window.setInterval(() => {
      this.secondsLeft > 0 ? this.secondsLeft-- : clearInterval(this.timerInterval);
    }, 1e3);
  }
  closeBar() {
    this.visible = !1;
  }
  formatTime(t) {
    const c = Math.floor(t / 3600), i = Math.floor(t % 3600 / 60), a = t % 60;
    return `${c}h ${i}m ${a}s`;
  }
  render() {
    return this.visible ? d`
      <div id="smart-announcement-bar">
        <div class="bar-content">
          <span class="bar-text">🔥 خصم 20% لفترة محدودة</span>
          <span id="bar-timer">${this.formatTime(this.secondsLeft)}</span>
          <button class="bar-btn">اطلب الآن</button>
        </div>
        <span class="close-bar" @click=${this.closeBar}>✖</span>
      </div>
    ` : d``;
  }
}
r(s, "styles", u`
    :host {
      display: block;
    }

    #smart-announcement-bar {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 9999;
      background: linear-gradient(270deg, #ff416c, #ff4b2b, #ff416c);
      background-size: 600% 600%;
      animation: gradientMove 8s ease infinite;
      color: white;
      padding: 10px;
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .bar-content {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
    }

    .bar-btn {
      background: white;
      color: #ff416c;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 5px;
    }

    .close-bar {
      position: absolute;
      right: 15px;
      cursor: pointer;
    }

    @keyframes gradientMove {
      0% { background-position: 0%; }
      50% { background-position: 100%; }
      100% { background-position: 0%; }
    }

    @media (max-width: 600px) {
      .bar-content {
        flex-direction: column;
        gap: 10px;
      }
    }
  `);
o([
  h({ type: Object })
], s.prototype, "config");
o([
  p()
], s.prototype, "visible");
o([
  p()
], s.prototype, "secondsLeft");
typeof s < "u" && s.registerSallaComponent("salla-announcement-bar");
export {
  s as AnnouncementBar
};
