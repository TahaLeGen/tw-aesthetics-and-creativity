import { LitElement as l, css as c, html as d } from "lit";
import { property as m } from "lit/decorators.js";
var p = Object.defineProperty, f = (n, t, r, u) => {
  for (var e = void 0, o = n.length - 1, s; o >= 0; o--)
    (s = n[o]) && (e = s(t, r, e) || e);
  return e && p(t, r, e), e;
};
const a = class a extends l {
  render() {
    var t, r;
    return d`
      <div class="marquee">
        <h3 class="marquee-title">${((t = this.config) == null ? void 0 : t.title) || "Marquee"}</h3>
        <div class="marquee-content">
          ${((r = this.config) == null ? void 0 : r.content) || "This is a new Marquee component"}
        </div>
      </div>
    `;
  }
};
a.styles = c`
    :host {
      display: block;
    }
    .marquee {
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .marquee-title {
      font-weight: 500;
      color: #2c3e50;
      margin: 0 0 1rem;
    }
    .marquee-content {
      color: #666;
    }
  `;
let i = a;
f([
  m({ type: Object })
], i.prototype, "config");
typeof i < "u" && i.registerSallaComponent("salla-marquee");
export {
  i as default
};
