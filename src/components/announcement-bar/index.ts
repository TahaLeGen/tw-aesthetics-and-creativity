import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';


export class AnnouncementBar extends LitElement {

    @property({ type: Object })
  config?: Record<string, any>;

  @state()
   visible = true;

  @state()
   secondsLeft: number = 60 * 60 * 24; // مثال: عداد يوم كامل

  private timerInterval: number | undefined;

  static styles = css`
    :host {
      display: block;
    }

    #smart-announcement-bar {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 9999;
      background: linear-gradient(270deg, #ff416c, #ff4b2b, #ff416c);
      background-size: 600% 600%;
      animation: gradientMove 8s ease infinite;
      color: white;
      padding: 10px;
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .bar-content {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
    }

    .bar-btn {
      background: white;
      color: #ff416c;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 5px;
    }

    .close-bar {
      position: absolute;
      right: 15px;
      cursor: pointer;
    }

    @keyframes gradientMove {
      0% { background-position: 0%; }
      50% { background-position: 100%; }
      100% { background-position: 0%; }
    }

    @media (max-width: 600px) {
      .bar-content {
        flex-direction: column;
        gap: 10px;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.startTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  startTimer() {
    this.timerInterval = window.setInterval(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  closeBar() {
    this.visible = false;
  }

  formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  }

  render() {
    if (!this.visible) return html``;

    return html`
      <div id="smart-announcement-bar">
        <div class="bar-content">
          <span class="bar-text">🔥 خصم 20% لفترة محدودة</span>
          <span id="bar-timer">${this.formatTime(this.secondsLeft)}</span>
          <button class="bar-btn">اطلب الآن</button>
        </div>
        <span class="close-bar" @click=${this.closeBar}>✖</span>
      </div>
    `;
  }
}