import { LitElement as a, css as c, html as d } from "lit";
import { property as p } from "lit/decorators.js";
var f = Object.defineProperty, h = (r, e, i, m) => {
  for (var t = void 0, s = r.length - 1, l; s >= 0; s--)
    (l = r[s]) && (t = l(e, i, t) || t);
  return t && f(e, i, t), t;
};
const o = class o extends a {
  render() {
    var e, i;
    return d`
      <div class="links">
        <h3 class="links-title">${((e = this.config) == null ? void 0 : e.title) || "Links"}</h3>
        <div class="links-content">
          ${((i = this.config) == null ? void 0 : i.content) || "This is a new Links component"}
        </div>
      </div>
    `;
  }
};
o.styles = c`
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
  `;
let n = o;
h([
  p({ type: Object })
], n.prototype, "config");
typeof n < "u" && n.registerSallaComponent("salla-links");
export {
  n as default
};
