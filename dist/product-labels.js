var F = Object.create;
var z = Object.defineProperty;
var G = Object.getOwnPropertyDescriptor;
var R = (e, l) => (l = Symbol[e]) ? l : Symbol.for("Symbol." + e), m = (e) => {
  throw TypeError(e);
};
var H = (e, l, a) => l in e ? z(e, l, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[l] = a;
var E = (e, l) => z(e, "name", { value: l, configurable: !0 });
var S = (e) => [, , , F((e == null ? void 0 : e[R("metadata")]) ?? null)], Y = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], g = (e) => e !== void 0 && typeof e != "function" ? m("Function expected") : e, J = (e, l, a, r, n) => ({ kind: Y[e], name: l, metadata: r, addInitializer: (s) => a._ ? m("Already initialized") : n.push(g(s || null)) }), K = (e, l) => H(l, R("metadata"), e[3]), q = (e, l, a, r) => {
  for (var n = 0, s = e[l >> 1], b = s && s.length; n < b; n++) l & 1 ? s[n].call(a) : r = s[n].call(a, r);
  return r;
}, A = (e, l, a, r, n, s) => {
  var b, i, I, f, x, t = l & 7, u = !!(l & 8), p = !!(l & 16), w = t > 3 ? e.length + 1 : t ? u ? 1 : 2 : 0, $ = Y[t + 5], j = t > 3 && (e[w - 1] = []), D = e[w] || (e[w] = []), c = t && (!p && !u && (n = n.prototype), t < 5 && (t > 3 || !p) && G(t < 4 ? n : { get [a]() {
    return C(this, s);
  }, set [a](o) {
    return N(this, s, o);
  } }, a));
  t ? p && t < 4 && E(s, (t > 2 ? "set " : t > 1 ? "get " : "") + a) : E(n, a);
  for (var v = r.length - 1; v >= 0; v--)
    f = J(t, a, I = {}, e[3], D), t && (f.static = u, f.private = p, x = f.access = { has: p ? (o) => M(n, o) : (o) => a in o }, t ^ 3 && (x.get = p ? (o) => (t ^ 1 ? C : O)(o, n, t ^ 4 ? s : c.get) : (o) => o[a]), t > 2 && (x.set = p ? (o, y) => N(o, n, y, t ^ 4 ? s : c.set) : (o, y) => o[a] = y)), i = (0, r[v])(t ? t < 4 ? p ? s : c[$] : t > 4 ? void 0 : { get: c.get, set: c.set } : n, f), I._ = 1, t ^ 4 || i === void 0 ? g(i) && (t > 4 ? j.unshift(i) : t ? p ? s = i : c[$] = i : n = i) : typeof i != "object" || i === null ? m("Object expected") : (g(b = i.get) && (c.get = b), g(b = i.set) && (c.set = b), g(b = i.init) && j.unshift(b));
  return t || K(e, n), c && z(n, a, c), p ? t ^ 4 ? s : c : n;
};
var _ = (e, l, a) => l.has(e) || m("Cannot " + a), M = (e, l) => Object(l) !== l ? m('Cannot use the "in" operator on this value') : e.has(l), C = (e, l, a) => (_(e, l, "read from private field"), a ? a.call(e) : l.get(e));
var N = (e, l, a, r) => (_(e, l, "write to private field"), r ? r.call(e, a) : l.set(e, a), a), O = (e, l, a) => (_(e, l, "access private method"), a);
import { LitElement as Q, css as T, html as U } from "lit";
import { customElement as V } from "lit/decorators.js";
var B, k, W;
B = [V("product-label")];
let d = class d extends (W = Q) {
  constructor() {
    super(...arguments), this.defaultIcons = {
      new: "✨",
      sale: "🔥",
      hot: "🌟"
    };
  }
  render() {
    var n, s, b;
    const l = ((n = this.config) == null ? void 0 : n.type) || "new", a = ((s = this.config) == null ? void 0 : s.text) || "New", r = ((b = this.config) == null ? void 0 : b.icon) || this.defaultIcons[l] || this.defaultIcons.new;
    return U`
      <div class="label label--${l}">
        <span class="label__icon">${r}</span>
        <span class="label__text">${a}</span>
      </div>
    `;
  }
};
k = S(W), d = A(k, 0, "ProductLabel", B, d), d.styles = T`
    :host {
      --label-bg-new: #1dd1a1;
      --label-bg-sale: #0984e3;
      --label-bg-hot: #ff6b6b;
      --label-text-color: #ffffff;
      --label-padding: 0.5rem 1rem;
      --label-font-size: 0.75rem;
      --label-font-weight: 600;
      --label-border-radius: 20px;
      --label-gap: 0.35rem;
    }

    .label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--label-gap);
      padding: var(--label-padding);
      border-radius: var(--label-border-radius);
      font-size: var(--label-font-size);
      font-weight: var(--label-font-weight);
      color: var(--label-text-color);
      background-color: var(--label-bg-new);
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      user-select: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: default;
    }

    .label:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    /* نوع البطاقة */
    .label--new {
      background-color: var(--label-bg-new);
    }

    .label--sale {
      background-color: var(--label-bg-sale);
    }

    .label--hot {
      background-color: var(--label-bg-hot);
    }

    .label__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2em;
      flex-shrink: 0;
    }

    .label__text {
      display: inline;
      line-height: 1;
    }

    /* Responsive */
    @media (max-width: 640px) {
      .label {
        --label-padding: 0.4rem 0.75rem;
        --label-font-size: 0.65rem;
      }
    }

    @media (max-width: 380px) {
      .label {
        --label-padding: 0.35rem 0.6rem;
        --label-font-size: 0.6rem;
        --label-gap: 0.25rem;
      }

      .label__icon {
        font-size: 1em;
      }
    }
  `, q(k, 1, d);
let h = d;
typeof h < "u" && h.registerSallaComponent("salla-product-labels");
export {
  h as default
};
