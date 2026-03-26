var p = Object.defineProperty;
var f = (l, e, a) => e in l ? p(l, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : l[e] = a;
var i = (l, e, a) => f(l, typeof e != "symbol" ? e + "" : e, a);
import { css as d, LitElement as g, html as m } from "lit";
import { property as u, customElement as x } from "lit/decorators.js";
var b = Object.defineProperty, h = Object.getOwnPropertyDescriptor, v = (l, e, a) => e in l ? b(l, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : l[e] = a, c = (l, e, a, r) => {
  for (var t = r > 1 ? void 0 : r ? h(e, a) : e, n = l.length - 1, o; n >= 0; n--)
    (o = l[n]) && (t = (r ? o(e, a, t) : o(t)) || t);
  return r && t && b(e, a, t), t;
}, w = (l, e, a) => v(l, e + "", a);
let s = class extends g {
  constructor() {
    super(...arguments);
    i(this, "config");
    /**
     * Default icons لكل نوع
     */
    i(this, "defaultIcons", {
      new: "✨",
      sale: "🔥",
      hot: "🌟"
    });
  }
  render() {
    var t, n, o;
    const e = ((t = this.config) == null ? void 0 : t.type) || "new", a = ((n = this.config) == null ? void 0 : n.text) || "New", r = ((o = this.config) == null ? void 0 : o.icon) || this.defaultIcons[e] || this.defaultIcons.new;
    return m`
      <div class="label label--${e}">
        <span class="label__icon">${r}</span>
        <span class="label__text">${a}</span>
      </div>
    `;
  }
};
w(s, "styles", d`
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
  `);
c([
  u({ type: Object })
], s.prototype, "config", 2);
s = c([
  x("product-label")
], s);
typeof s < "u" && s.registerSallaComponent("salla-product-labels");
export {
  s as default
};
