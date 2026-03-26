var c = Object.defineProperty;
var d = (i, t, e) => t in i ? c(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var l = (i, t, e) => d(i, typeof t != "symbol" ? t + "" : t, e);
import { LitElement as p, css as f, html as h } from "lit";
import { property as k } from "lit/decorators.js";
var m = Object.defineProperty, g = (i, t, e, o) => {
  for (var n = void 0, r = i.length - 1, a; r >= 0; r--)
    (a = i[r]) && (n = a(t, e, n) || n);
  return n && m(t, e, n), n;
};
class s extends p {
  constructor() {
    super(...arguments);
    l(this, "config");
  }
  render() {
    var e, o;
    return h`
      <div class="links">
        <h3 class="links-title">${((e = this.config) == null ? void 0 : e.title) || "Links"}</h3>
        <div class="links-content">
          ${((o = this.config) == null ? void 0 : o.content) || "This is a new Links component"}
        </div>
      </div>
    `;
  }
}
l(s, "styles", f`
    :host {
      display: block;
    }
    .links {
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .links-title {
      font-weight: 500;
      color: #2c3e50;
      margin: 0 0 1rem;
    }
    .links-content {
      color: #666;
    }
  `);
g([
  k({ type: Object })
], s.prototype, "config");
typeof s < "u" && s.registerSallaComponent("salla-links");
export {
  s as default
};
