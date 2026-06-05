import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { localizedString } from '../../utils/i18n.js';

interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
}

export class FlashSaleBanner extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;

  @state() private timerState: TimerState = { hours: 0, minutes: 0, seconds: 0 };
  private timerId: number | null = null;

  protected createRenderRoot() { return this; }

  private get cfg() {
    const expirationDate = this.config?.['expiration_date'];
    const endTime = expirationDate ? new Date(expirationDate).getTime() : Date.now() + 3600000;

    return {
      background:    this.config?.['background']    ?? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      primary_color: this.config?.['primary_color'] ?? '#ff4757',
      badge_color:   this.config?.['badge_color']   ?? '#ffa502',
      title:         localizedString(this.config?.['title'],       'Flash Sale'),
      promo_text:    localizedString(this.config?.['promo_text'],  'Limited time offer'),
      button_text:   localizedString(this.config?.['button_text'], 'Shop Now'),
      button_link:   this.config?.['button_link']   ?? '#',
      discount:      localizedString(this.config?.['discount'],    ''),
      end_time:      endTime,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTimer();
    this.startTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopTimer();
  }

  private startTimer() {
    if (this.timerId !== null) return;
    this.timerId = window.setInterval(() => this.updateTimer(), 1000);
  }

  private stopTimer() {
    if (this.timerId !== null) { clearInterval(this.timerId); this.timerId = null; }
  }

  private updateTimer() {
    const diff = this.cfg.end_time - Date.now();
    if (diff <= 0) { this.timerState = { hours: 0, minutes: 0, seconds: 0 }; this.stopTimer(); return; }
    const total = Math.floor(diff / 1000);
    this.timerState = {
      hours:   Math.floor(total / 3600) % 24,
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60,
    };
    this.requestUpdate();
  }

  private pad(n: number) { return String(n).padStart(2, '0'); }

  render() {
    const c = this.cfg;
    const hourLabel   = localizedString(this.config?.['label_hours'],   'ساعة');
    const minuteLabel = localizedString(this.config?.['label_minutes'], 'دقيقة');
    const secondLabel = localizedString(this.config?.['label_seconds'], 'ثانية');

    return html`
      <style>
        .fsb-container { position:relative; width:100%; min-height:300px; display:flex; align-items:center; justify-content:center; background:${c.background}; background-size:cover; background-position:center; overflow:hidden; border-radius:8px; box-shadow:0 10px 40px rgba(0,0,0,0.2); }
        .fsb-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.3); z-index:1; }
        .fsb-content { position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px; text-align:center; gap:20px; width:100%; }
        .fsb-badge { position:absolute; top:20px; right:20px; background:${c.badge_color}; color:#000; width:80px; height:80px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:28px; font-weight:bold; z-index:3; animation:fsb-pulse 2s ease-in-out infinite; }
        .fsb-title { font-size:clamp(28px,8vw,56px); font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:3px; text-shadow:0 4px 8px rgba(0,0,0,0.3); }
        .fsb-promo { font-size:clamp(14px,3vw,18px); color:rgba(255,255,255,0.95); font-weight:300; letter-spacing:1px; }
        .fsb-timer { display:flex; gap:15px; justify-content:center; flex-wrap:wrap; }
        .fsb-unit { display:flex; flex-direction:column; align-items:center; gap:8px; }
        .fsb-box { background:rgba(255,255,255,0.15); backdrop-filter:blur(10px); border:2px solid rgba(255,255,255,0.3); border-radius:8px; width:70px; height:70px; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:bold; color:${c.primary_color}; }
        .fsb-label { font-size:11px; text-transform:uppercase; letter-spacing:2px; color:rgba(255,255,255,0.8); font-weight:600; }
        .fsb-btn { padding:14px 44px; font-size:16px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; background:${c.primary_color}; color:#fff; border:none; border-radius:8px; cursor:pointer; text-decoration:none; display:inline-block; transition:transform 0.2s,box-shadow 0.2s; }
        .fsb-btn:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,0.3); }
        @keyframes fsb-pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.1); } }
        @media (max-width:480px) { .fsb-box { width:56px; height:56px; font-size:22px; } }
      </style>
      <div class="fsb-container" role="region" aria-label="${c.title}">
        <div class="fsb-overlay" aria-hidden="true"></div>
        <div class="fsb-content">
          ${c.discount ? html`<div class="fsb-badge" aria-label="خصم ${c.discount}">${c.discount}</div>` : ''}
          <h1 class="fsb-title">${c.title}</h1>
          <p class="fsb-promo">${c.promo_text}</p>
          <div class="fsb-timer" role="timer" aria-label="العداد التنازلي">
            <div class="fsb-unit"><div class="fsb-box">${this.pad(this.timerState.hours)}</div><span class="fsb-label">${hourLabel}</span></div>
            <div class="fsb-unit"><div class="fsb-box">${this.pad(this.timerState.minutes)}</div><span class="fsb-label">${minuteLabel}</span></div>
            <div class="fsb-unit"><div class="fsb-box">${this.pad(this.timerState.seconds)}</div><span class="fsb-label">${secondLabel}</span></div>
          </div>
          <a class="fsb-btn" href="${c.button_link}">${c.button_text}</a>
        </div>
      </div>
    `;
  }
}
