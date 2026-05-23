import { LitElement, html, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface LinkItem {
  title: string;
  link: string;
  image: string;
}

export class MainLinksStyle1 extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  @state() private sliderId: number = Math.floor(Math.random() * (2112 - 21 + 1)) + 21;
  private swiperInstance: Swiper | null = null;

  protected createRenderRoot() { return this; }

  private get cfg() {
    const resolveDropdown = (val: any, fallback: number): number => {
      let result: number;
      if (Array.isArray(val) && val.length > 0) {
        result = Number(val[0]?.value ?? val[0]);
      } else if (typeof val === 'object' && val !== null) {
        result = Number(val.value ?? fallback);
      } else {
        result = Number(val ?? fallback);
      }
      return isNaN(result) ? fallback : result;
    };

    return {
      section_title:          this.config?.['section_title']          ?? 'Explore Our Global Network',
      section_description:    this.config?.['section_description']    ?? 'Discover specialized hubs, regional ecosystems, and open-source documentation.',
      background:             this.config?.['background']             ?? 'rgba(22,22,26,0.99)',
      slides_per_view_mobile: resolveDropdown(this.config?.['slides_per_view_mobile'], 1),
      slides_per_view_tablet: resolveDropdown(this.config?.['slides_per_view_tablet'], 2),
      slides_per_view_desktop:resolveDropdown(this.config?.['slides_per_view_desktop'], 4),
      items: (this.config?.['items'] ?? [
        { title: 'Developer Portal',    link: '/developers', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80' },
        { title: 'Community Ecosystem', link: '/community',  image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80' },
        { title: 'Design Systems',      link: '/design',     image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80' },
        { title: 'Research & Labs',     link: '/labs',       image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80' },
        { title: 'Cloud Architecture',  link: '/cloud',      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80' },
        { title: 'Global Events',       link: '/events',     image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80' },
      ]) as LinkItem[],
    };
  }

  firstUpdated() { this.initSwiper(); }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('component')) {
      setTimeout(() => this.initSwiper(), 0);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.swiperInstance?.destroy(true, true);
  }

  private initSwiper() {
    const container = this.renderRoot.querySelector(`.main-links-style-1-${this.sliderId}`) as HTMLElement;
    if (!container) return;
    this.swiperInstance?.destroy(true, true);
    const c = this.cfg;
    this.swiperInstance = new Swiper(container, {
      modules: [Navigation, Pagination],
      slidesPerView: c.slides_per_view_mobile,
      spaceBetween: 20,
      breakpoints: {
        768:  { slidesPerView: c.slides_per_view_tablet },
        1024: { slidesPerView: c.slides_per_view_desktop },
      },
      navigation: { nextEl: `.next-${this.sliderId}`, prevEl: `.prev-${this.sliderId}` },
      pagination: { el: `.pagination-${this.sliderId}`, clickable: true },
    });
  }

  private renderSectionHeader() {
    const { section_title, section_description } = this.cfg;
    return html`
      <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:1rem;margin-bottom:2.5rem;" data-sal="slide-up" data-sal-duration="700">
        <h2 style="margin:0;font-size:2rem;font-weight:600;letter-spacing:-0.025em;color:#ffffff;line-height:1.2;">${section_title}</h2>
        <p style="margin:0;font-size:1rem;color:rgba(255,255,255,0.7);font-weight:400;line-height:1.7;max-width:42rem;">${section_description}</p>
      </div>
    `;
  }

  private renderNavButtons() {
    return html`
      <div style="display:flex;align-items:center;justify-content:center;gap:0.75rem;margin-top:2rem;">
        <button class="ml-nav-btn prev-${this.sliderId}" aria-label="Previous" style="all:unset;cursor:pointer;width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);transition:all 0.25s;box-sizing:border-box;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
        <button class="ml-nav-btn next-${this.sliderId}" aria-label="Next" style="all:unset;cursor:pointer;width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);transition:all 0.25s;box-sizing:border-box;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
      </div>
    `;
  }

  private renderLinkCard(link: LinkItem, index: number) {
    return html`
      <div class="swiper-slide" style="height:auto;flex-shrink:0;box-sizing:border-box;">
        <a href="${link.link}" class="ml-card" data-sal="slide-up" data-sal-duration="700" data-sal-delay="${(index + 1) * 80}"
           style="display:flex;flex-direction:column;height:100%;text-decoration:none;border-radius:18px;overflow:hidden;background:rgba(8,8,10,0.72);border:1px solid rgba(255,255,255,0.08);box-shadow:0 2px 0 rgba(255,255,255,0.05) inset,0 8px 32px rgba(0,0,0,0.55);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),border-color 0.3s,box-shadow 0.4s;">
          <div style="width:100%;aspect-ratio:4/3;overflow:hidden;">
            <img loading="lazy" src="${link.image}" alt="${link.title}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s ease;">
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;gap:8px;">
            <h4 style="margin:0;font-size:0.9375rem;font-weight:500;color:#ffffff;line-height:1.4;">${link.title}</h4>
            <span class="ml-card-arrow" style="color:rgba(255,255,255,0.45);flex-shrink:0;transition:transform 0.3s,color 0.3s;display:inline-flex;">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </span>
          </div>
        </a>
      </div>
    `;
  }

  render() {
    const c = this.cfg;
    return html`
      <style>
        .ml-section {
          position: relative; padding: 5rem 0; overflow: hidden;
          background: ${c.background};
          border-top: 1px solid rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .ml-inner { position: relative; max-width: 80rem; margin: 0 auto; padding: 0 1.5rem; }
        .ml-swiper { overflow: hidden; }
        .ml-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.16) !important; box-shadow: 0 2px 0 rgba(255,255,255,0.07) inset, 0 20px 50px rgba(0,0,0,0.7) !important; }
        .ml-card:hover img { transform: scale(1.06); }
        .ml-card:hover .ml-card-arrow { color: #ffffff !important; transform: translateX(-3px); }
        .ml-nav-btn:hover { background: rgba(255,255,255,0.12) !important; border-color: rgba(255,255,255,0.22) !important; color: #ffffff !important; transform: scale(1.06); }
        .ml-nav-btn:active { transform: scale(0.94); }
        .swiper-slide { flex-shrink: 0 !important; box-sizing: border-box; }
      </style>
      <section class="ml-section" dir="rtl">
        <div class="ml-inner">
          ${this.renderSectionHeader()}
          <div class="ml-swiper main-links-style-1-${this.sliderId}">
            <div class="swiper-wrapper">
              ${c.items.map((link, index) => this.renderLinkCard(link, index))}
            </div>
          </div>
          ${this.renderNavButtons()}
        </div>
      </section>
    `;
  }
}
