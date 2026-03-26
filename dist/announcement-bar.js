import { LitElement as f, css as b, html as d } from "lit";
import { property as m, state as p } from "lit/decorators.js";
var u = Object.defineProperty, n = (o, i, r, c) => {
  for (var t = void 0, s = o.length - 1, l; s >= 0; s--)
    (l = o[s]) && (t = l(i, r, t) || t);
  return t && u(i, r, t), t;
};
const a = class a extends f {
  constructor() {
    super(...arguments), this.visible = !0, this.secondsLeft = 60 * 60 * 24;
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
  formatTime(i) {
    const r = Math.floor(i / 3600), c = Math.floor(i % 3600 / 60), t = i % 60;
    return `${r}h ${c}m ${t}s`;
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
};
a.styles = b`
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
  `;
let e = a;
n([
  m({ type: Object })
], e.prototype, "config");
n([
  p()
], e.prototype, "visible");
n([
  p()
], e.prototype, "secondsLeft");
typeof e < "u" && e.registerSallaComponent("salla-announcement-bar");
export {
  e as AnnouncementBar
};
