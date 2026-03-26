import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Product Label Component
 * عرض بطاقات المنتجات (جديد، تخفيض، ساخن)
 */
@customElement('product-label')
export default class ProductLabel extends LitElement {
  /**
   * استقبال البيانات من twilight.json
   * المتوقع: { type: "new" | "sale" | "hot", text: "النص", icon?: "الرمز" }
   */
  @property({ type: Object })
  config?: Record<string, any>;

  static styles = css`
    :host {
      --label-bg-new: #1dd1a1;
      --label-bg-sale: #0984e3;
      --label-bg-hot: #ff6b6b;
      --label-text-color: #ffffff;
      --label-padding: 0.5rem 1rem;
      --label-font-size: 0.75rem;
      --label-font-weight: 600;
      --label-border-radius: 20px;
      --label-gap: 0.35rem;
    }

    .label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--label-gap);
      padding: var(--label-padding);
      border-radius: var(--label-border-radius);
      font-size: var(--label-font-size);
      font-weight: var(--label-font-weight);
      color: var(--label-text-color);
      background-color: var(--label-bg-new);
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      user-select: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: default;
    }

    .label:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    /* نوع البطاقة */
    .label--new {
      background-color: var(--label-bg-new);
    }

    .label--sale {
      background-color: var(--label-bg-sale);
    }

    .label--hot {
      background-color: var(--label-bg-hot);
    }

    .label__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2em;
      flex-shrink: 0;
    }

    .label__text {
      display: inline;
      line-height: 1;
    }

    /* Responsive */
    @media (max-width: 640px) {
      .label {
        --label-padding: 0.4rem 0.75rem;
        --label-font-size: 0.65rem;
      }
    }

    @media (max-width: 380px) {
      .label {
        --label-padding: 0.35rem 0.6rem;
        --label-font-size: 0.6rem;
        --label-gap: 0.25rem;
      }

      .label__icon {
        font-size: 1em;
      }
    }
  `;

  /**
   * Default icons لكل نوع
   */
  private defaultIcons: Record<string, string> = {
    new: '✨',
    sale: '🔥',
    hot: '🌟',
  };

  render() {
    // استخراج البيانات من config
    const type = this.config?.type || 'new';
    const text = this.config?.text || 'New';
    const icon = this.config?.icon || this.defaultIcons[type] || this.defaultIcons.new;

    return html`
      <div class="label label--${type}">
        <span class="label__icon">${icon}</span>
        <span class="label__text">${text}</span>
      </div>
    `;
  }
}