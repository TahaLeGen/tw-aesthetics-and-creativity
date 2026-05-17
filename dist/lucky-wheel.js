import { LitElement as c, css as a, html as d } from "lit";
import { property as h } from "lit/decorators.js";
var p = Object.defineProperty, f = (n, t, l, u) => {
  for (var e = void 0, o = n.length - 1, s; o >= 0; o--)
    (s = n[o]) && (e = s(t, l, e) || e);
  return e && p(t, l, e), e;
};
const r = class r extends c {
  render() {
    var t, l;
    return d`
      <div class="lucky-wheel">
        <h3 class="lucky-wheel-title">${((t = this.config) == null ? void 0 : t.title) || "Lucky Wheel"}</h3>
        <div class="lucky-wheel-content">
          ${((l = this.config) == null ? void 0 : l.content) || "This is a new Lucky Wheel component"}
        </div>
      </div>
    `;
  }
};
r.styles = a`
    :host {
      display: block;
    }
    .lucky-wheel {
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .lucky-wheel-title {
      font-weight: 500;
      color: #2c3e50;
      margin: 0 0 1rem;
    }
    .lucky-wheel-content {
      color: #666;
    }
  `;
let i = r;
f([
  h({ type: Object })
], i.prototype, "config");
typeof i < "u" && i.registerSallaComponent("salla-lucky-wheel");
export {
  i as default
};
