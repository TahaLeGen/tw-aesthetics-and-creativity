import { LitElement as n, css as l, html as o } from "lit";
import "lit/decorators.js";
const i = class i extends n {
  render() {
    var s, e;
    return o`
      <div class="links">
        <h3 class="links-title">${((s = this.config) == null ? void 0 : s.title) || "Links"}</h3>
        <div class="links-content">
          ${((e = this.config) == null ? void 0 : e.content) || "This is a new Links component"}
        </div>
      </div>
    `;
  }
};
i.styles = l`
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
let t = i;
typeof t < "u" && t.registerSallaComponent("salla-links");
export {
  t as default
};
