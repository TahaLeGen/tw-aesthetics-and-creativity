import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class Links extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  static styles = css`
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

  render() {
    return html`
      <div class="links">
        <h3 class="links-title">${this.config?.title || 'Links'}</h3>
        <div class="links-content">
          ${this.config?.content || 'This is a new Links component'}
        </div>
      </div>
    `;
  }
}
