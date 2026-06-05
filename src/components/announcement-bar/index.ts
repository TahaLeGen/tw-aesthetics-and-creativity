import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { localizedString } from '../../utils/i18n.js';

export class AnnouncementBar extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;

  @state() private visible = true;
  @state() private secondsLeft: number = 0;
  private timerInterval: number | undefined;

  protected createRenderRoot() { return this; }

  private get cfg() {
    return {
      background:        this.config?.['background']        ?? 'linear-gradient(270deg,#ff416c,#ff4b2b,#ff416c)',
      text_color:        this.config?.['text_color']        ?? '#ffffff',
      button_color:      this.config?.['button_color']      ?? '#ff416c',
      message:           localizedString(this.config?.['message'],      '🔥 خصم 20% لفترة محدودة'),
      button_text:       localizedString(this.config?.['button_text'],  'اطلب الآن'),
      button_link:       this.config?.['button_link']       ?? '#',
      countdown_seconds: this.config?.['countdown_seconds'] ?? 86400,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.secondsLeft = this.cfg.countdown_seconds;
    this.startTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  private startTimer() {
    this.timerInterval = window.setInterval(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  private formatTime(s: number) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  }

  render() {
    if (!this.visible) return html``;
    const c = this.cfg;
    return html`
      <style>
        .ab-bar { position:fixed; top:0; width:100%; z-index:9999; background:${c.background}; background-size:600% 600%; animation:ab-gradient 8s ease infinite; color:${c.text_color}; padding:10px; font-family:sans-serif; display:flex; justify-content:center; align-items:center; }
        .ab-content { display:flex; justify-content:center; align-items:center; gap:15px; }
        .ab-btn { background:${c.text_color}; color:${c.button_color}; border:none; padding:5px 10px; cursor:pointer; border-radius:5px; font-weight:600; text-decoration:none; font-size:14px; }
        .ab-close { position:absolute; right:15px; cursor:pointer; font-size:16px; background:none; border:none; color:inherit; line-height:1; }
        @keyframes ab-gradient { 0%,100% { background-position:0%; } 50% { background-position:100%; } }
        @media (max-width:600px) { .ab-content { flex-direction:column; gap:8px; } }
      </style>
      <div class="ab-bar" dir="rtl" role="banner" aria-live="polite">
        <div class="ab-content">
          <span>${c.message}</span>
          <span aria-label="الوقت المتبقي">${this.formatTime(this.secondsLeft)}</span>
          <a class="ab-btn" href="${c.button_link}">${c.button_text}</a>
        </div>
        <button class="ab-close" aria-label="إغلاق الإعلان" @click="${() => { this.visible = false; }}">✖</button>
      </div>
    `;
  }
}
