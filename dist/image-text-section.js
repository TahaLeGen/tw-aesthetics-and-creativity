import { LitElement as g, html as d } from "lit";
import { property as f, state as x } from "lit/decorators.js";
import { l as r } from "./i18n-P4yXTTHR.js";
var b = Object.defineProperty, p = (n, t, e, l) => {
  for (var i = void 0, o = n.length - 1, s; o >= 0; o--)
    (s = n[o]) && (i = s(t, e, i) || i);
  return i && b(t, e, i), i;
};
class a extends g {
  constructor() {
    super(...arguments), this.isFavorite = !1;
  }
  createRenderRoot() {
    return this;
  }
  get cfg() {
    var t, e, l, i, o, s, c;
    return {
      background: ((t = this.config) == null ? void 0 : t.background) ?? "#ffffff",
      title: r((e = this.config) == null ? void 0 : e.title, "Morning Set"),
      description: r((l = this.config) == null ? void 0 : l.description, "Set of coffee and chocolate cookies as a top tier among our customers."),
      image: ((i = this.config) == null ? void 0 : i.image) ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8jWfT4riCwXsSDzOPjgrZYz118o8D0K8Pg&s",
      button_text: r((o = this.config) == null ? void 0 : o.button_text, "READ MORE"),
      button_link: ((s = this.config) == null ? void 0 : s.button_link) ?? "#",
      tags: ((c = this.config) == null ? void 0 : c.tags) ?? [
        { label: "sugar" },
        { label: "vanilla aroma" },
        { label: "cherry jam" }
      ]
    };
  }
  render() {
    const t = this.cfg;
    return d`
      <style>
        .its-wrap { display:flex; justify-content:center; align-items:center; padding:20px; background:${t.background}; font-family:Arial,sans-serif; }
        .its-card { display:flex; flex-direction:row; width:100%; max-width:700px; min-height:350px; background:#fff; border-radius:15px; box-shadow:0 4px 8px rgba(0,0,0,0.1); overflow:hidden; }
        .its-image { flex:1; position:relative; min-height:250px; }
        .its-image img { width:100%; height:100%; object-fit:cover; display:block; }
        .its-star { position:absolute; top:15px; right:15px; font-size:28px; color:#fff; text-shadow:0 2px 4px rgba(0,0,0,0.5); cursor:pointer; transition:color 0.3s; background:none; border:none; line-height:1; }
        .its-star.active { color:gold; }
        .its-info { flex:1; padding:30px; display:flex; flex-direction:column; justify-content:center; }
        .its-info h2 { margin:0 0 15px; font-size:24px; }
        .its-info p { font-size:14px; color:#555; line-height:1.5; margin-bottom:20px; }
        .its-tags { margin-bottom:25px; display:flex; flex-wrap:wrap; gap:6px; }
        .its-tag { display:inline-block; background:orange; border-radius:10px; padding:5px 10px; font-size:12px; cursor:pointer; transition:background 0.3s; }
        .its-tag:hover { background:greenyellow; }
        .its-action { display:flex; justify-content:flex-end; margin-top:auto; }
        .its-btn { background:#000; color:#fff; border:none; border-radius:20px; padding:10px 20px; cursor:pointer; font-size:14px; transition:background 0.3s,color 0.3s; text-decoration:none; }
        .its-btn:hover { background:#444; color:greenyellow; }
        @media (max-width:600px) { .its-card { flex-direction:column; } .its-image { min-height:200px; } }
      </style>
      <div class="its-wrap">
        <div class="its-card">
          <div class="its-image">
            <img src="${t.image}" alt="${t.title}">
            <button class="its-star ${this.isFavorite ? "active" : ""}"
                    aria-label="${this.isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}"
                    @click="${() => {
      this.isFavorite = !this.isFavorite;
    }}">★</button>
          </div>
          <div class="its-info">
            <h2>${t.title}</h2>
            <p>${t.description}</p>
            <div class="its-tags">
              ${t.tags.map((e) => d`<span class="its-tag">${r(e.label)}</span>`)}
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
], a.prototype, "config");
p([
  x()
], a.prototype, "isFavorite");
typeof a < "u" && a.registerSallaComponent("salla-image-text-section");
export {
  a as SplitProductCard
};
