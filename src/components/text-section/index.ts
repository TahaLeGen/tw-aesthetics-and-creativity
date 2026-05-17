import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class TextSection extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  static styles = css`
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

  render() {
    return html`
      <div class="text-section">
        <h3 class="text-section-title">${this.config?.title || 'Text Section'}</h3>
        <div class="text-section-content">
          ${this.config?.content || 'This is a new Text Section component'}
        </div>
      </div>
    `;
  }
}
