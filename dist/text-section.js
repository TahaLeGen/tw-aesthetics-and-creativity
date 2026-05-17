import { LitElement as a, css as l, html as d } from "lit";
import { property as p } from "lit/decorators.js";
var f = Object.defineProperty, x = (r, e, i, h) => {
  for (var t = void 0, n = r.length - 1, c; n >= 0; n--)
    (c = r[n]) && (t = c(e, i, t) || t);
  return t && f(e, i, t), t;
};
const s = class s extends a {
  render() {
    var e, i;
    return d`
      <div class="text-section">
        <h3 class="text-section-title">${((e = this.config) == null ? void 0 : e.title) || "Text Section"}</h3>
        <div class="text-section-content">
          ${((i = this.config) == null ? void 0 : i.content) || "This is a new Text Section component"}
        </div>
      </div>
    `;
  }
};
s.styles = l`
    :host {
      display: block;
    }
    .text-section {
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .text-section-title {
      font-weight: 500;
      color: #2c3e50;
      margin: 0 0 1rem;
    }
    .text-section-content {
      color: #666;
    }
  `;
let o = s;
x([
  p({ type: Object })
], o.prototype, "config");
typeof o < "u" && o.registerSallaComponent("salla-text-section");
export {
  o as default
};
