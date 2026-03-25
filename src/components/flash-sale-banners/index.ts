import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
}

@customElement('flash-sale-banner')
export class FlashSaleBanner extends LitElement {
  static styles = css`
    :host {
      --primary-color: #ff4757;
      --secondary-color: #2f3542;
      --text-color: #ffffff;
      --badge-color: #ffa502;
      --hover-scale: 1.05;
      --transition-duration: 300ms;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .banner-container {
      position: relative;
      width: 100%;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--banner-bg, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
      background-size: cover;
      background-position: center;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }

    /* Animated background overlay */
    .banner-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 1;
      animation: fadeIn 0.6s ease-in;
    }

    /* Content wrapper */
    .banner-content {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      text-align: center;
      gap: 20px;
    }

    /* Discount badge */
    .discount-badge {
      position: absolute;
      top: 20px;
      right: 20px;
      background: var(--badge-color);
      color: #000;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: bold;
      z-index: 3;
      box-shadow: 0 5px 15px rgba(255, 165, 2, 0.3);
      animation: pulse 2s ease-in-out infinite;
    }

    /* Headline styling */
    .headline {
      font-size: clamp(28px, 8vw, 56px);
      font-weight: 900;
      color: var(--text-color);
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 10px;
      animation: slideDown 0.6s ease-out;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    /* Promotional text */
    .promo-text {
      font-size: clamp(14px, 3vw, 18px);
      color: var(--text-color);
      font-weight: 300;
      letter-spacing: 1px;
      margin-bottom: 30px;
      animation: slideUp 0.6s ease-out 0.2s both;
      opacity: 0.95;
    }

    /* Timer container */
    .timer-container {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 30px;
      animation: slideUp 0.6s ease-out 0.4s both;
    }

    .timer-unit {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .timer-box {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: bold;
      color: var(--primary-color);
      transition: all var(--transition-duration) ease;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
      animation: timerPulse 1s ease-in-out infinite;
    }

    .timer-box:hover {
      transform: scale(var(--hover-scale));
      border-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 8px 32px rgba(255, 71, 87, 0.5);
    }

    .timer-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 600;
    }

    /* Responsive timer sizes */
    @media (max-width: 600px) {
      .timer-box {
        width: 60px;
        height: 60px;
        font-size: 24px;
      }

      .timer-label {
        font-size: 10px;
      }
    }

    /* CTA Button */
    .cta-button {
      padding: 16px 48px;
      font-size: clamp(14px, 2.5vw, 18px);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      background: var(--primary-color);
      color: var(--text-color);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all var(--transition-duration) ease;
      box-shadow: 0 8px 24px rgba(255, 71, 87, 0.4);
      animation: slideUp 0.6s ease-out 0.6s both;
      position: relative;
      overflow: hidden;
    }

    .cta-button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .cta-button:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(255, 71, 87, 0.6);
      background: #ff3838;
    }

    .cta-button:hover::before {
      width: 400px;
      height: 400px;
    }

    .cta-button:active {
      transform: translateY(-2px);
    }

    /* Animations */
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulse {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }

    @keyframes timerPulse {
      0%,
      100% {
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
      }
      50% {
        box-shadow: 0 8px 32px rgba(255, 71, 87, 0.3);
      }
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .banner-container {
        min-height: 280px;
      }

      .banner-content {
        padding: 30px 15px;
        gap: 15px;
      }

      .discount-badge {
        width: 70px;
        height: 70px;
        font-size: 22px;
        top: 15px;
        right: 15px;
      }

      .timer-container {
        gap: 10px;
        margin-bottom: 20px;
      }

      .promo-text {
        margin-bottom: 20px;
      }
    }

    @media (max-width: 480px) {
      .banner-container {
        min-height: 250px;
        border-radius: 4px;
      }

      .banner-content {
        padding: 20px 10px;
        gap: 12px;
      }

      .discount-badge {
        width: 60px;
        height: 60px;
        font-size: 18px;
        top: 10px;
        right: 10px;
      }

      .cta-button {
        padding: 12px 36px;
      }

      .timer-container {
        gap: 8px;
        margin-bottom: 15px;
      }
    }
  `;

  // Properties with decorators
  @property({ type: String })
  title: string = 'Flash Sale';

  @property({ type: String })
  promoText: string = 'Limited time offer';

  @property({ type: String })
  buttonText: string = 'Shop Now';

  @property({ type: String })
  discount: string = '-50%';

  @property({ type: String })
  backgroundColor: string = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

  @property({ type: Number })
  endTime: number = Date.now() + 3600000; // Default: 1 hour from now

  @property({ type: String })
  primaryColor: string = '#ff4757';

  @property({ type: String })
  badgeColor: string = '#ffa502';

  // Internal state
  private timerState: TimerState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  private timerId: number | null = null;

  // Lifecycle methods
  connectedCallback(): void {
    super.connectedCallback();
    this.updateTimer();
    this.startTimer();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopTimer();
  }

  // Timer management
  private startTimer(): void {
    if (this.timerId !== null) {
      return; // Timer already running
    }

    this.timerId = window.setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private updateTimer(): void {
    const now = Date.now();
    const difference = this.endTime - now;

    if (difference <= 0) {
      this.timerState = { hours: 0, minutes: 0, seconds: 0 };
      this.stopTimer();
      this.dispatchEvent(
        new CustomEvent('timer-expired', {
          detail: { expired: true },
          bubbles: true,
          composed: true,
        })
      );
      return;
    }

    const totalSeconds = Math.floor(difference / 1000);
    this.timerState = {
      hours: Math.floor(totalSeconds / 3600) % 24,
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };

    this.requestUpdate();
  }

  // Event handlers
  private handleButtonClick(): void {
    this.dispatchEvent(
      new CustomEvent('cta-clicked', {
        detail: { timestamp: Date.now() },
        bubbles: true,
        composed: true,
      })
    );
  }

  // Helper method for zero-padding numbers
  private padNumber(num: number): string {
    return String(num).padStart(2, '0');
  }

  render() {
    return html`
      <div class="banner-container" style="--banner-bg: ${this.backgroundColor}; --primary-color: ${this.primaryColor}; --badge-color: ${this.badgeColor};">
        <div class="banner-overlay"></div>
        <div class="banner-content">
          ${this.discount ? html`<div class="discount-badge">${this.discount}</div>` : null}

          <h1 class="headline">${this.title}</h1>

          <p class="promo-text">${this.promoText}</p>

          <div class="timer-container">
            <div class="timer-unit">
              <div class="timer-box">${this.padNumber(this.timerState.hours)}</div>
              <span class="timer-label">Hours</span>
            </div>
            <div class="timer-unit">
              <div class="timer-box">${this.padNumber(this.timerState.minutes)}</div>
              <span class="timer-label">Minutes</span>
            </div>
            <div class="timer-unit">
              <div class="timer-box">${this.padNumber(this.timerState.seconds)}</div>
              <span class="timer-label">Seconds</span>
            </div>
          </div>

          <button class="cta-button" @click="${this.handleButtonClick}">
            ${this.buttonText}
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'flash-sale-banner': FlashSaleBanner;
  }
}