import { LitElement as l, css as c, html as d } from "lit";
import { state as p } from "lit/decorators.js";
var g = Object.defineProperty, f = (r, a, s, h) => {
  for (var t = void 0, e = r.length - 1, n; e >= 0; e--)
    (n = r[e]) && (t = n(a, s, t) || t);
  return t && g(a, s, t), t;
};
const i = class i extends l {
  constructor() {
    super(...arguments), this.isFavorite = !1;
  }
  // Event handler for the star
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
  // Event handler for the button
  handleReadMore() {
    alert("Loading more details... wait ma plet");
  }
  // Render the component's HTML
  render() {
    return d`
      <div class="product-card">
        <!-- Left Half: Image -->
        <div class="image-container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8jWfT4riCwXsSDzOPjgrZYz118o8D0K8Pg&s" alt="Morning Set">
          <span 
            class="favorite-star ${this.isFavorite ? "active" : ""}" 
            @click="${this.toggleFavorite}"
            title="Mark as favorite">
            ★
          </span>
        </div>
        
        <!-- Right Half: Text & Actions -->
        <div class="product-info">
          <h2>Morning Set</h2>
          <p>Set of coffee and chocolate cookies as a top tier among our customers and a perfect way to start your day.</p>
          
          <div class="tags">
            <span class="tag">sugar</span>
            <span class="tag">vanilla aroma</span>
            <!-- Uncommented the third tag to balance out the new layout visually -->
            <span class="tag">cherry jam</span>
          </div>
          
          <div class="action-area">
            <button class="read-more-button" @click="${this.handleReadMore}">READ MORE</button>
          </div>
        </div>
      </div>
      
      <p class="footer-text"> 🔹Jii vorn 🔹</p>
    `;
  }
};
i.styles = c`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
      /* Background color moved to host or can be applied to the body of your main app */
      padding: 20px; 
    }

    .product-card {
      display: flex;
      flex-direction: row; /* Forces the 50/50 split side-by-side layout */
      width: 700px;
      min-height: 350px; /* Ensure there is enough height for the split */
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden; /* Clips the image cleanly inside the border-radius */
    }

    /* Half image */
    .image-container {
      flex: 1; 
      position: relative;
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* Ensures the image covers its half without stretching */
      display: block;
    }

    .favorite-star {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 28px;
      color: #fff;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5); /* Added for better visibility over images */
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .favorite-star.active {
      color: gold;
    }

    /* Half text */
    .product-info {
      flex: 1; 
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: left;
    }

    .product-info h2 {
      margin: 0 0 15px 0;
      font-size: 24px;
    }

    .product-info p {
      font-size: 14px;
      color: #555;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .tags {
      margin-bottom: 25px;
    }

    .tag {
      cursor: pointer;
      display: inline-block;
      background-color: orange;
      border-radius: 10px;
      padding: 5px 10px;
      font-size: 12px;
      margin-right: 5px;
      margin-bottom: 5px;
      transition: background-color 0.3s;
    }

    .tag:hover {
      background-color: greenyellow;
    }

    .action-area {
      display: flex;
      justify-content: flex-end; /* Aligns button to the right now that price is removed */
      margin-top: auto; /* Pushes the button to the bottom of the container */
    }

    .read-more-button {
      background-color: #000;
      color: #fff;
      border: none;
      border-radius: 20px;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s, color 0.3s;
    }

    .read-more-button:hover {
      background-color: #444;
      color: greenyellow;
    }

    .footer-text {
      margin-top: 20px;
      color: #333;
    }
  `;
let o = i;
f([
  p()
], o.prototype, "isFavorite");
typeof o < "u" && o.registerSallaComponent("salla-image-text-section");
export {
  o as SplitProductCard
};
