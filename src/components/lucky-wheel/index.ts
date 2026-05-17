import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export default class LuckyWheel extends LitElement {
  @property({ type: Object })
  config?: Record<string, any>;

  static styles = css`
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

  render() {
    return html`
      <div class="lucky-wheel">
        <h3 class="lucky-wheel-title">${this.config?.title || 'Lucky Wheel'}</h3>
        <div class="lucky-wheel-content">
          ${this.config?.content || 'This is a new Lucky Wheel component'}
        </div>
      </div>
    `;
  }
}
