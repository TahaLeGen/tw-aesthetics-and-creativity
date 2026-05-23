import { LitElement as l, html as d } from "lit";
import { property as f, state as g } from "lit/decorators.js";
var x = Object.defineProperty, p = (n, t, o, a) => {
  for (var i = void 0, e = n.length - 1, s; e >= 0; e--)
    (s = n[e]) && (i = s(t, o, i) || i);
  return i && x(t, o, i), i;
};
class r extends l {
  constructor() {
    super(...arguments), this.isFavorite = !1;
  }
  createRenderRoot() {
    return this;
  }
  get cfg() {
    var t, o, a, i, e, s, c;
    return {
      background: ((t = this.config) == null ? void 0 : t.background) ?? "#ffffff",
      title: ((o = this.config) == null ? void 0 : o.title) ?? "Morning Set",
      description: ((a = this.config) == null ? void 0 : a.description) ?? "Set of coffee and chocolate cookies as a top tier among our customers.",
      image: ((i = this.config) == null ? void 0 : i.image) ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8jWfT4riCwXsSDzOPjgrZYz118o8D0K8Pg&s",
      button_text: ((e = this.config) == null ? void 0 : e.button_text) ?? "READ MORE",
      button_link: ((s = this.config) == null ? void 0 : s.button_link) ?? "#",
      tags: ((c = this.config) == null ? void 0 : c.tags) ?? ["sugar", "vanilla aroma", "cherry jam"]
    };
  }
  render() {
    const t = this.cfg;
    return d`
      <style>
        .its-wrap { display: flex; justify-content: center; align-items: center; padding: 20px; background: ${t.background}; font-family: Arial, sans-serif; }
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
      <div class="its-wrap">
        <div class="its-card">
          <div class="its-image">
            <img src="${t.image}" alt="${t.title}">
            <span class="its-star ${this.isFavorite ? "active" : ""}" @click="${() => {
      this.isFavorite = !this.isFavorite;
    }}" title="Mark as favorite">★</span>
          </div>
          <div class="its-info">
            <h2>${t.title}</h2>
            <p>${t.description}</p>
            <div class="its-tags">
              ${t.tags.map((o) => d`<span class="its-tag">${o}</span>`)}
            </div>
            <div class="its-action">
              <a class="its-btn" href="${t.button_link}">${t.button_text}</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
p([
  f({ type: Object })
], r.prototype, "config");
p([
  g()
], r.prototype, "isFavorite");
typeof r < "u" && r.registerSallaComponent("salla-image-text-section");
export {
  r as SplitProductCard
};
