var K = Object.create;
var I = Object.defineProperty;
var N = Object.getOwnPropertyDescriptor;
var E = (t, e) => (e = Symbol[t]) ? e : Symbol.for("Symbol." + t), h = (t) => {
  throw TypeError(t);
};
var O = (t, e, i) => e in t ? I(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var T = (t, e) => I(t, "name", { value: e, configurable: !0 });
var S = (t) => [, , , K((t == null ? void 0 : t[E("metadata")]) ?? null)], q = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], m = (t) => t !== void 0 && typeof t != "function" ? h("Function expected") : t, P = (t, e, i, a, r) => ({ kind: q[t], name: e, metadata: a, addInitializer: (n) => i._ ? h("Already initialized") : r.push(m(n || null)) }), Q = (t, e) => O(e, E("metadata"), t[3]), D = (t, e, i, a) => {
  for (var r = 0, n = t[e >> 1], p = n && n.length; r < p; r++) e & 1 ? n[r].call(i) : a = n[r].call(i, a);
  return a;
}, F = (t, e, i, a, r, n) => {
  var p, c, L, f, g, s = e & 7, x = !!(e & 8), d = !!(e & 16), v = s > 3 ? t.length + 1 : s ? x ? 1 : 2 : 0, $ = q[s + 5], M = s > 3 && (t[v - 1] = []), J = t[v] || (t[v] = []), l = s && (!d && !x && (r = r.prototype), s < 5 && (s > 3 || !d) && N(s < 4 ? r : { get [i]() {
    return j(this, n);
  }, set [i](o) {
    return z(this, n, o);
  } }, i));
  s ? d && s < 4 && T(n, (s > 2 ? "set " : s > 1 ? "get " : "") + i) : T(r, i);
  for (var k = a.length - 1; k >= 0; k--)
    f = P(s, i, L = {}, t[3], J), s && (f.static = x, f.private = d, g = f.access = { has: d ? (o) => R(r, o) : (o) => i in o }, s ^ 3 && (g.get = d ? (o) => (s ^ 1 ? j : U)(o, r, s ^ 4 ? n : l.get) : (o) => o[i]), s > 2 && (g.set = d ? (o, y) => z(o, r, y, s ^ 4 ? n : l.set) : (o, y) => o[i] = y)), c = (0, a[k])(s ? s < 4 ? d ? n : l[$] : s > 4 ? void 0 : { get: l.get, set: l.set } : r, f), L._ = 1, s ^ 4 || c === void 0 ? m(c) && (s > 4 ? M.unshift(c) : s ? d ? n = c : l[$] = c : r = c) : typeof c != "object" || c === null ? h("Object expected") : (m(p = c.get) && (l.get = p), m(p = c.set) && (l.set = p), m(p = c.init) && M.unshift(p));
  return s || Q(t, r), l && I(r, i, l), d ? s ^ 4 ? n : l : r;
};
var w = (t, e, i) => e.has(t) || h("Cannot " + i), R = (t, e) => Object(e) !== e ? h('Cannot use the "in" operator on this value') : t.has(e), j = (t, e, i) => (w(t, e, "read from private field"), i ? i.call(t) : e.get(t));
var z = (t, e, i, a) => (w(t, e, "write to private field"), a ? a.call(t, i) : e.set(t, i), i), U = (t, e, i) => (w(t, e, "access private method"), i);
import { LitElement as V, css as W, html as G } from "lit";
import { customElement as X } from "lit/decorators.js";
var H, C, Y;
H = [X("announcement-bar")];
let b = class b extends (Y = V) {
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
  formatTime(e) {
    const i = Math.floor(e / 3600), a = Math.floor(e % 3600 / 60), r = e % 60;
    return `${i}h ${a}m ${r}s`;
  }
  render() {
    return this.visible ? G`
      <div id="smart-announcement-bar">
        <div class="bar-content">
          <span class="bar-text">🔥 خصم 20% لفترة محدودة</span>
          <span id="bar-timer">${this.formatTime(this.secondsLeft)}</span>
          <button class="bar-btn">اطلب الآن</button>
        </div>
        <span class="close-bar" @click=${this.closeBar}>✖</span>
      </div>
    ` : G``;
  }
};
C = S(Y), b = F(C, 0, "AnnouncementBar", H, b), b.styles = W`
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
  `, D(C, 1, b);
let u = b;
typeof u < "u" && u.registerSallaComponent("salla-announcement-bar");
export {
  u as AnnouncementBar
};
