import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';

export interface WheelSection {
  id: number;
  color: string;
  label: string;
  isGift: boolean;
  promoCode?: string;
}

export class LuckySpinWheel extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;

  @state() private attemptsUsed: number = 0;
  @state() private currentRotation: number = 0;
  @state() private isSpinning: boolean = false;
  @state() private feedbackMessage: string = 'العب واربح هديتك المميزة!';
  @state() private isGameOver: boolean = false;
  @state() private pointerTilting: boolean = false;
  @state() private wonPromoCode: string = '';

  protected createRenderRoot() { return this; }

  private get cfg() {
    const rawAttempts = this.config?.['max_attempts'];
    console.log('[lucky-wheel] raw max_attempts:', JSON.stringify(rawAttempts), typeof rawAttempts);
    console.log('[lucky-wheel] full config:', JSON.stringify(this.config));

    // Handle all possible shapes the platform might send:
    // - plain number: 3
    // - dropdown object: { label: "3", value: 3, key: "..." }
    // - array of selected items: [{ label: "3", value: 3, key: "..." }]
    let maxAttempts = 3;
    if (Array.isArray(rawAttempts) && rawAttempts.length > 0) {
      maxAttempts = Number(rawAttempts[0]?.value ?? rawAttempts[0]);
    } else if (typeof rawAttempts === 'object' && rawAttempts !== null) {
      maxAttempts = Number(rawAttempts.value ?? 3);
    } else if (rawAttempts !== undefined && rawAttempts !== null) {
      maxAttempts = Number(rawAttempts);
    }
    if (isNaN(maxAttempts)) maxAttempts = 3;

    const rawSections = this.config?.['sections'];
    const sections = (Array.isArray(rawSections) ? rawSections : [
      { id: 1, color: '#16a085', label: 'فضي',   isGift: false },
      { id: 2, color: '#2980b9', label: 'شارة',  isGift: false },
      { id: 3, color: '#34495e', label: 'مجاني', isGift: false },
      { id: 4, color: '#f39c12', label: 'غموض',  isGift: false },
      { id: 5, color: '#d35400', label: 'جائزة', isGift: true, promoCode: 'WINNER2024' },
      { id: 6, color: '#c0392b', label: 'طاقة',  isGift: false },
    ]) as WheelSection[];

    return {
      background:   this.config?.['background']   ?? 'radial-gradient(circle at 50% 0%, #2c3e50 0%, #0f171e 100%)',
      max_attempts: maxAttempts,
      sections,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.restoreState();
  }

  private restoreState() {
    const saved = localStorage.getItem('spin_wheel_attempts_used');
    if (saved) this.attemptsUsed = parseInt(saved, 10);

    if (localStorage.getItem('spin_wheel_gift_won') === 'true') {
      this.isGameOver = true;
      this.wonPromoCode = localStorage.getItem('spin_wheel_promo_code') || '';
      this.feedbackMessage = '✨ لقد فزت بهديتك المميزة من قبل!';
    } else if (this.attemptsUsed >= this.cfg.max_attempts) {
      this.isGameOver = true;
      this.feedbackMessage = '❌ لا محاولات متبقية.';
    }
  }

  private spin() {
    if (this.isSpinning || this.isGameOver) return;

    this.isSpinning = true;
    this.pointerTilting = true;
    this.attemptsUsed += 1;
    localStorage.setItem('spin_wheel_attempts_used', String(this.attemptsUsed));

    const sections = this.cfg.sections;
    const extraSpin = 360 * 6;
    const randomOffset = Math.floor(Math.random() * 360);
    this.currentRotation += extraSpin + randomOffset;

    const normalized = (360 - (this.currentRotation % 360)) % 360;
    const sliceSize = 360 / sections.length;
    const prize = sections[Math.floor(normalized / sliceSize)];

    setTimeout(() => {
      this.pointerTilting = false;
      this.isSpinning = false;
      this.resolvePrize(prize);
    }, 5000);
  }

  private resolvePrize(prize: WheelSection) {
    if (prize.isGift) {
      this.isGameOver = true;
      this.wonPromoCode = prize.promoCode || '';
      this.feedbackMessage = `🎉 مبروك! لقد فزت بـ: ${prize.label}!`;
      localStorage.setItem('spin_wheel_gift_won', 'true');
      localStorage.setItem('spin_wheel_promo_code', this.wonPromoCode);
    } else if (this.attemptsUsed >= this.cfg.max_attempts) {
      this.isGameOver = true;
      this.feedbackMessage = `❌ انتهت المحاولات. حصلت على ${prize.label}.`;
    } else {
      this.feedbackMessage = `حصلت على ${prize.label}. حاول مجدداً!`;
    }
  }

  private buildWheelSVG(sections: WheelSection[]): string {
    const cx = 140, cy = 140, r = 140;
    const total = sections.length;
    const arc = (2 * Math.PI) / total;
    const tr = r * 0.62;
    let paths = '';

    for (let i = 0; i < total; i++) {
      const startAngle = i * arc - Math.PI / 2;
      const endAngle   = startAngle + arc;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArc = arc > Math.PI ? 1 : 0;

      paths += `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z" fill="${sections[i].color}" stroke="#fff" stroke-width="2"/>`;

      const midAngle = startAngle + arc / 2;
      const tx = cx + tr * Math.cos(midAngle);
      const ty = cy + tr * Math.sin(midAngle);
      const deg = (midAngle * 180) / Math.PI + 90;

      paths += `<text x="${tx}" y="${ty}" transform="rotate(${deg},${tx},${ty})" text-anchor="middle" dominant-baseline="middle" font-size="14" font-weight="800" font-family="Segoe UI,Tahoma,Arial,sans-serif" fill="white">${sections[i].label}</text>`;
    }

    paths += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="white" stroke-width="6"/>`;
    return paths;
  }

  render() {
    const { sections, max_attempts, background } = this.cfg;
    const isDisabled = this.isGameOver || this.isSpinning;

    return html`
      <style>
        .lw-host { font-family: system-ui,-apple-system,sans-serif; background: ${background}; padding: 2.5rem 1.25rem; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.4); max-width: 400px; margin: 20px auto; color: #ffffff; display: block; }
        .lw-wrapper { display: flex; flex-direction: column; align-items: center; position: relative; }
        .lw-frame { width: 280px; height: 280px; border-radius: 50%; position: relative; box-shadow: 0 0 24px rgba(0,0,0,0.4); }
        .lw-svg { width: 280px; height: 280px; border-radius: 50%; display: block; transition: transform 5s cubic-bezier(0.15,0.95,0.35,1); }
        .lw-hub { width: 76px; height: 76px; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); border-radius: 50%; background: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); z-index: 50; cursor: pointer; user-select: none; transition: transform 0.1s ease; border: none; outline: none; }
        .lw-hub::after { content: "دوّر"; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; color: #2c3e50; }
        .lw-hub::before { content: ""; position: absolute; width: 0; height: 0; border-style: solid; border-width: 0 14px 22px 14px; border-color: transparent transparent #ffffff transparent; top: -14px; left: 24px; }
        .lw-hub:hover:not(.lw-hub--disabled) { transform: translate(-50%,-50%) scale(1.04); }
        .lw-hub:active:not(.lw-hub--disabled) { transform: translate(-50%,-50%) scale(0.96); }
        .lw-hub--disabled { background: #e0e0e0; cursor: not-allowed; }
        .lw-hub--disabled::after { color: #95a5a6; }
        .lw-hub--disabled::before { border-color: transparent transparent #e0e0e0 transparent; }
        @keyframes lw-tilt { 0%,100% { transform: translate(-50%,-50%) rotate(0deg); } 50% { transform: translate(-50%,-50%) rotate(6deg); } }
        .lw-hub--tilting { animation: lw-tilt 0.1s ease-in-out infinite; }
        .lw-dashboard { margin-top: 1.5rem; text-align: center; width: 100%; }
        .lw-feedback { font-size: 1rem; font-weight: 500; color: #ecf0f1; margin-bottom: 0.5rem; min-height: 1.5rem; }
        .lw-badge { display: inline-block; padding: 6px 14px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; font-size: 13px; color: #bdc3c7; }
        .lw-badge strong { color: #f1c40f; font-weight: bold; }
        .lw-promo { margin-top: 1.25rem; padding: 1rem 1.5rem; background: linear-gradient(135deg,rgba(241,196,15,0.15),rgba(243,156,18,0.1)); border: 1px solid rgba(241,196,15,0.4); border-radius: 14px; text-align: center; }
        .lw-promo-label { font-size: 0.8rem; color: rgba(255,255,255,0.6); margin-bottom: 0.5rem; }
        .lw-promo-code { font-size: 1.5rem; font-weight: 900; color: #f1c40f; letter-spacing: 0.15em; cursor: pointer; user-select: all; padding: 0.4rem 1rem; background: rgba(0,0,0,0.25); border-radius: 8px; display: inline-block; transition: background 0.2s; }
        .lw-promo-code:hover { background: rgba(0,0,0,0.4); }
        .lw-copy-hint { font-size: 0.72rem; color: rgba(255,255,255,0.4); margin-top: 0.4rem; }
      </style>

      <div class="lw-host" dir="rtl">
        <div class="lw-wrapper">
          <div class="lw-frame" style="position:relative;">
            <svg class="lw-svg" viewBox="0 0 280 280"
                 style="transform: rotate(${this.currentRotation}deg);"
                 .innerHTML="${this.buildWheelSVG(sections)}">
            </svg>
            <button class="lw-hub ${isDisabled ? 'lw-hub--disabled' : ''} ${this.pointerTilting ? 'lw-hub--tilting' : ''}"
                    @click="${this.spin}" ?disabled="${isDisabled}">
            </button>
          </div>
          <div class="lw-dashboard">
            <div class="lw-feedback">${this.feedbackMessage}</div>
            <div class="lw-badge">المحاولات: <strong>${max_attempts - this.attemptsUsed}</strong> / ${max_attempts} متبقية</div>
            ${this.wonPromoCode ? html`
              <div class="lw-promo">
                <div class="lw-promo-label">كود الخصم الخاص بك</div>
                <div class="lw-promo-code" @click="${() => navigator.clipboard?.writeText(this.wonPromoCode)}">${this.wonPromoCode}</div>
                <div class="lw-copy-hint">اضغط للنسخ</div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }
}
