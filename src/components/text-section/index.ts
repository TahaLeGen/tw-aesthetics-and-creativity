import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export class TextSectionSplitLayout extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;

  protected createRenderRoot() { return this; }

  private get cfg() {
    return {
      background:       this.config?.['background']       ?? 'radial-gradient(circle at 50% 0%, rgba(32,32,35,0.9) 0%, rgba(18,18,20,1) 100%)',
      text_color:       this.config?.['text_color']       ?? '#ffffff',
      accent_color:     this.config?.['accent_color']     ?? '#60a5fa',
      section_title:    this.config?.['section_title']    ?? 'Building the Future Infrastructure',
      section_subtitle: this.config?.['section_subtitle'] ?? 'SCALABLE ARCHITECTURE FOR MODERN APPLICATIONS',
      main_paragraph:   this.config?.['main_paragraph']   ?? 'Our core framework is designed from the ground up to solve complex distributed systems challenges seamlessly.',
      side_blocks: (this.config?.['side_blocks'] ?? [
        { title: '99.9% Operational Uptime',  description: 'Distributed fault isolation prevents localized errors from cascading across regions.' },
        { title: 'Zero Shared State',          description: 'Atomic data propagation eliminates synchronization bottlenecks at scale.' },
        { title: 'Sub-millisecond Compute',    description: 'Optimized compilation pathways maximize edge delivery execution cycles.' },
      ]) as { title: string; description: string }[],
    };
  }

  render() {
    const c = this.cfg;
    return html`
      <style>
        .text-layout-section {
          background: ${c.background};
          padding: 6rem 1.5rem;
          color: ${c.text_color};
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .text-layout-inner { max-width: 72rem; margin: 0 auto; }
        .text-layout-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: start; }
        @media (min-width: 1024px) {
          .text-layout-grid { grid-template-columns: 7fr 5fr; gap: 4rem; }
        }
        .glass-info-block {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 1.5rem;
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }
        .glass-info-block:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.12); }
      </style>

      <section class="text-layout-section" dir="rtl">
        <div class="text-layout-inner">
          <div style="text-align:center;max-width:48rem;margin:0 auto 4rem;" data-sal="slide-up" data-sal-duration="800">
            <span style="display:block;font-size:0.75rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:${c.accent_color};margin-bottom:0.75rem;">
              ${c.section_subtitle}
            </span>
            <h2 style="margin:0;font-size:clamp(1.875rem,4vw,3rem);font-weight:700;letter-spacing:-0.025em;color:${c.text_color};line-height:1.15;">
              ${c.section_title}
            </h2>
          </div>

          <div class="text-layout-grid">
            <div data-sal="slide-up" data-sal-duration="800" data-sal-delay="100">
              <p style="margin:0;font-size:1.125rem;color:rgba(255,255,255,0.75);font-weight:400;line-height:1.8;text-align:justify;">
                ${c.main_paragraph}
              </p>
            </div>
            <div style="display:flex;flex-direction:column;gap:1.25rem;">
              ${c.side_blocks.map((block, index) => html`
                <div class="glass-info-block" data-sal="slide-up" data-sal-duration="700" data-sal-delay="${200 + index * 100}">
                  <h3 style="margin:0 0 0.5rem;font-size:1rem;font-weight:600;color:${c.text_color};line-height:1.4;">${block.title}</h3>
                  <p style="margin:0;font-size:0.9rem;color:rgba(255,255,255,0.55);font-weight:400;line-height:1.7;">${block.description}</p>
                </div>
              `)}
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
