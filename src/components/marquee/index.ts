import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class Marquee extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  static styles = css`
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

  render() {
    return html`
      <div class="marquee">
        <h3 class="marquee-title">${this.config?.title || 'Marquee'}</h3>
        <div class="marquee-content">
          ${this.config?.content || 'This is a new Marquee component'}
        </div>
      </div>
    `;
  }
}
