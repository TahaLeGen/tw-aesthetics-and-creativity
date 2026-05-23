import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';

export class SplitProductCard extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  @state() private isFavorite = false;

  protected createRenderRoot() { return this; }

  private get cfg() {
    return {
      background:   this.config?.['background']   ?? '#ffffff',
      title:        this.config?.['title']        ?? 'Morning Set',
      description:  this.config?.['description']  ?? 'Set of coffee and chocolate cookies as a top tier among our customers.',
      image:        this.config?.['image']        ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8jWfT4riCwXsSDzOPjgrZYz118o8D0K8Pg&s',
      button_text:  this.config?.['button_text']  ?? 'READ MORE',
      button_link:  this.config?.['button_link']  ?? '#',
      tags: (this.config?.['tags'] ?? ['sugar', 'vanilla aroma', 'cherry jam']) as string[],
    };
  }

  render() {
    const c = this.cfg;
    return html`
      <style>
        .its-card { display: flex; flex-direction: row; width: 700px; min-height: 350px; background: #fff; border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden; }
        .its-image { flex: 1; position: relative; }
        .its-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .its-star { position: absolute; top: 15px; right: 15px; font-size: 28px; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.5); cursor: pointer; transition: color 0.3s; }
        .its-star.active { color: gold; }
        .its-info { flex: 1; padding: 30px; display: flex; flex-direction: column; justify-content: center; }
        .its-info h2 { margin: 0 0 15px; font-size: 24px; }
        .its-info p { font-size: 14px; color: #555; line-height: 1.5; margin-bottom: 20px; }
        .its-tags { margin-bottom: 25px; }
        .its-tag { display: inline-block; background: orange; border-radius: 10px; padding: 5px 10px; font-size: 12px; margin: 0 5px 5px 0; cursor: pointer; transition: background 0.3s; }
        .its-tag:hover { background: greenyellow; }
        .its-action { display: flex; justify-content: flex-end; margin-top: auto; }
        .its-btn { background: #000; color: #fff; border: none; border-radius: 20px; padding: 10px 20px; cursor: pointer; font-size: 14px; transition: background 0.3s, color 0.3s; text-decoration: none; }
        .its-btn:hover { background: #444; color: greenyellow; }
        @media (max-width: 720px) { .its-card { flex-direction: column; width: 100%; } }
      </style>
        <div class="its-card">
          <div class="its-image">
            <img src="${c.image}" alt="${c.title}">
            <span class="its-star ${this.isFavorite ? 'active' : ''}" @click="${() => { this.isFavorite = !this.isFavorite; }}" title="Mark as favorite">★</span>
          </div>
          <div class="its-info">
            <h2>${c.title}</h2>
            <p>${c.description}</p>
            <div class="its-tags">
              ${c.tags.map(tag => html`<span class="its-tag">${tag?.label}</span>`)}
            </div>
            <div class="its-action">
              <a class="its-btn" href="${c.button_link}">${c.button_text}</a>
            </div>
          </div>
      </div>
    `;
  }
}
