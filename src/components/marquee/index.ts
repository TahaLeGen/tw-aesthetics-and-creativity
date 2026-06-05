import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { localizedString } from '../../utils/i18n.js';

export class MarqueeComponent extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;

  protected createRenderRoot() { return this; }

  private get cfg() {
    return {
      background: this.config?.['background'] ?? 'rgba(22,22,26,0.98)',
      text_color: this.config?.['text_color'] ?? '#ffffff',
      speed:      this.config?.['speed']      ?? 25,
      separator:  localizedString(this.config?.['separator'], '✦'),
      items: (this.config?.['items'] ?? [
        { text: 'تصميم إبداعي' },
        { text: 'تجربة مستخدم استثنائية' },
        { text: 'أداء عالي السرعة' },
        { text: 'واجهات حديثة' },
        { text: 'تطوير متقدم' },
        { text: 'حلول رقمية متكاملة' },
      ]) as { text: string | Record<string, string>; icon?: string }[],
    };
  }

  render() {
    const { background, text_color, speed, separator, items } = this.cfg;
    const allItems = [...items, ...items];

    return html`
      <style>
        .mq-section { overflow:hidden; width:100%; background:${background}; border-top:1px solid rgba(255,255,255,0.06); border-bottom:1px solid rgba(255,255,255,0.06); padding:1rem 0; direction:rtl; }
        .mq-track { display:flex; width:max-content; animation:mq-scroll ${speed}s linear infinite; }
        .mq-track:hover { animation-play-state:paused; }
        .mq-item { display:inline-flex; align-items:center; gap:1rem; padding:0 1.5rem; white-space:nowrap; font-size:1rem; font-weight:500; color:${text_color}; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
        .mq-separator { color:rgba(255,255,255,0.3); font-size:0.6rem; }
        @keyframes mq-scroll { 0% { transform:translateX(0%); } 100% { transform:translateX(-50%); } }
      </style>
      <div class="mq-section">
        <div class="mq-track">
          ${allItems.map((item) => html`
            <span class="mq-item">
              ${item.icon ? html`<span aria-hidden="true">${item.icon}</span>` : ''}
              ${localizedString(item.text)}
              <span class="mq-separator" aria-hidden="true">${separator}</span>
            </span>
          `)}
        </div>
      </div>
    `;
  }
}
