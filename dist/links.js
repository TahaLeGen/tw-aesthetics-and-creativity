import { LitElement as Oe, html as Y } from "lit";
import { property as ze, state as Ae } from "lit/decorators.js";
function ue(e) {
  return e !== null && typeof e == "object" && "constructor" in e && e.constructor === Object;
}
function fe(e = {}, i = {}) {
  const t = ["__proto__", "constructor", "prototype"];
  Object.keys(i).filter((s) => t.indexOf(s) < 0).forEach((s) => {
    typeof e[s] > "u" ? e[s] = i[s] : ue(i[s]) && ue(e[s]) && Object.keys(i[s]).length > 0 && fe(e[s], i[s]);
  });
}
const Se = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function j() {
  const e = typeof document < "u" ? document : {};
  return fe(e, Se), e;
}
const Ge = {
  document: Se,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > "u" || clearTimeout(e);
  }
};
function _() {
  const e = typeof window < "u" ? window : {};
  return fe(e, Ge), e;
}
function _e(e = "") {
  return e.trim().split(" ").filter((i) => !!i.trim());
}
function De(e) {
  const i = e;
  Object.keys(i).forEach((t) => {
    try {
      i[t] = null;
    } catch {
    }
    try {
      delete i[t];
    } catch {
    }
  });
}
function ye(e, i = 0) {
  return setTimeout(e, i);
}
function K() {
  return Date.now();
}
function Be(e) {
  const i = _();
  let t;
  return i.getComputedStyle && (t = i.getComputedStyle(e, null)), !t && e.currentStyle && (t = e.currentStyle), t || (t = e.style), t;
}
function $e(e, i = "x") {
  const t = _();
  let s, r, n;
  const l = Be(e);
  return t.WebKitCSSMatrix ? (r = l.transform || l.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map((o) => o.replace(",", ".")).join(", ")), n = new t.WebKitCSSMatrix(r === "none" ? "" : r)) : (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), s = n.toString().split(",")), i === "x" && (t.WebKitCSSMatrix ? r = n.m41 : s.length === 16 ? r = parseFloat(s[12]) : r = parseFloat(s[4])), i === "y" && (t.WebKitCSSMatrix ? r = n.m42 : s.length === 16 ? r = parseFloat(s[13]) : r = parseFloat(s[5])), r || 0;
}
function X(e) {
  return typeof e == "object" && e !== null && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object";
}
function Ve(e) {
  return typeof window < "u" && typeof window.HTMLElement < "u" ? e instanceof HTMLElement : e && (e.nodeType === 1 || e.nodeType === 11);
}
function B(...e) {
  const i = Object(e[0]);
  for (let t = 1; t < e.length; t += 1) {
    const s = e[t];
    if (s != null && !Ve(s)) {
      const r = Object.keys(Object(s)).filter((n) => n !== "__proto__" && n !== "constructor" && n !== "prototype");
      for (let n = 0, l = r.length; n < l; n += 1) {
        const o = r[n], a = Object.getOwnPropertyDescriptor(s, o);
        a !== void 0 && a.enumerable && (X(i[o]) && X(s[o]) ? s[o].__swiper__ ? i[o] = s[o] : B(i[o], s[o]) : !X(i[o]) && X(s[o]) ? (i[o] = {}, s[o].__swiper__ ? i[o] = s[o] : B(i[o], s[o])) : i[o] = s[o]);
      }
    }
  }
  return i;
}
function q(e, i, t) {
  e.style.setProperty(i, t);
}
function we({
  swiper: e,
  targetPosition: i,
  side: t
}) {
  const s = _(), r = -e.translate;
  let n = null, l;
  const o = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none", s.cancelAnimationFrame(e.cssModeFrameID);
  const a = i > r ? "next" : "prev", f = (p, b) => a === "next" && p >= b || a === "prev" && p <= b, g = () => {
    l = (/* @__PURE__ */ new Date()).getTime(), n === null && (n = l);
    const p = Math.max(Math.min((l - n) / o, 1), 0), b = 0.5 - Math.cos(p * Math.PI) / 2;
    let c = r + b * (i - r);
    if (f(c, i) && (c = i), e.wrapperEl.scrollTo({
      [t]: c
    }), f(c, i)) {
      e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
          [t]: c
        });
      }), s.cancelAnimationFrame(e.cssModeFrameID);
      return;
    }
    e.cssModeFrameID = s.requestAnimationFrame(g);
  };
  g();
}
function V(e, i = "") {
  const t = _(), s = [...e.children];
  return t.HTMLSlotElement && e instanceof HTMLSlotElement && s.push(...e.assignedElements()), i ? s.filter((r) => r.matches(i)) : s;
}
function Fe(e, i) {
  const t = [i];
  for (; t.length > 0; ) {
    const s = t.shift();
    if (e === s)
      return !0;
    t.push(...s.children, ...s.shadowRoot ? s.shadowRoot.children : [], ...s.assignedElements ? s.assignedElements() : []);
  }
}
function Ne(e, i) {
  const t = _();
  let s = i.contains(e);
  return !s && t.HTMLSlotElement && i instanceof HTMLSlotElement && (s = [...i.assignedElements()].includes(e), s || (s = Fe(e, i))), s;
}
function Q(e) {
  try {
    console.warn(e);
    return;
  } catch {
  }
}
function Z(e, i = []) {
  const t = document.createElement(e);
  return t.classList.add(...Array.isArray(i) ? i : _e(i)), t;
}
function He(e, i) {
  const t = [];
  for (; e.previousElementSibling; ) {
    const s = e.previousElementSibling;
    i ? s.matches(i) && t.push(s) : t.push(s), e = s;
  }
  return t;
}
function Re(e, i) {
  const t = [];
  for (; e.nextElementSibling; ) {
    const s = e.nextElementSibling;
    i ? s.matches(i) && t.push(s) : t.push(s), e = s;
  }
  return t;
}
function H(e, i) {
  return _().getComputedStyle(e, null).getPropertyValue(i);
}
function J(e) {
  let i = e, t;
  if (i) {
    for (t = 0; (i = i.previousSibling) !== null; )
      i.nodeType === 1 && (t += 1);
    return t;
  }
}
function xe(e, i) {
  const t = [];
  let s = e.parentElement;
  for (; s; )
    i ? s.matches(i) && t.push(s) : t.push(s), s = s.parentElement;
  return t;
}
function oe(e, i, t) {
  const s = _();
  return e[i === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getComputedStyle(e, null).getPropertyValue(i === "width" ? "margin-right" : "margin-top")) + parseFloat(s.getComputedStyle(e, null).getPropertyValue(i === "width" ? "margin-left" : "margin-bottom"));
}
function A(e) {
  return (Array.isArray(e) ? e : [e]).filter((i) => !!i);
}
function de(e, i = "") {
  typeof trustedTypes < "u" ? e.innerHTML = trustedTypes.createPolicy("html", {
    createHTML: (t) => t
  }).createHTML(i) : e.innerHTML = i;
}
let te;
function je() {
  const e = _(), i = j();
  return {
    smoothScroll: i.documentElement && i.documentElement.style && "scrollBehavior" in i.documentElement.style,
    touch: !!("ontouchstart" in e || e.DocumentTouch && i instanceof e.DocumentTouch)
  };
}
function Te() {
  return te || (te = je()), te;
}
let ie;
function qe({
  userAgent: e
} = {}) {
  const i = Te(), t = _(), s = t.navigator.platform, r = e || t.navigator.userAgent, n = {
    ios: !1,
    android: !1
  }, l = t.screen.width, o = t.screen.height, a = r.match(/(Android);?[\s\/]+([\d.]+)?/);
  let f = r.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
  const g = r.match(/(iPod)(.*OS\s([\d_]+))?/), p = !f && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/), b = s === "Win32";
  let c = s === "MacIntel";
  const h = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !f && c && i.touch && h.indexOf(`${l}x${o}`) >= 0 && (f = r.match(/(Version)\/([\d.]+)/), f || (f = [0, 1, "13_0_0"]), c = !1), a && !b && (n.os = "android", n.android = !0), (f || p || g) && (n.os = "ios", n.ios = !0), n;
}
function Ee(e = {}) {
  return ie || (ie = qe(e)), ie;
}
let se;
function We() {
  const e = _(), i = Ee();
  let t = !1;
  function s() {
    const o = e.navigator.userAgent.toLowerCase();
    return o.indexOf("safari") >= 0 && o.indexOf("chrome") < 0 && o.indexOf("android") < 0;
  }
  if (s()) {
    const o = String(e.navigator.userAgent);
    if (o.includes("Version/")) {
      const [a, f] = o.split("Version/")[1].split(" ")[0].split(".").map((g) => Number(g));
      t = a < 16 || a === 16 && f < 2;
    }
  }
  const r = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent), n = s(), l = n || r && i.ios;
  return {
    isSafari: t || n,
    needPerspectiveFix: t,
    need3dFix: l,
    isWebView: r
  };
}
function Ce() {
  return se || (se = We()), se;
}
function Ye({
  swiper: e,
  on: i,
  emit: t
}) {
  const s = _();
  let r = null, n = null;
  const l = () => {
    !e || e.destroyed || !e.initialized || (t("beforeResize"), t("resize"));
  }, o = () => {
    !e || e.destroyed || !e.initialized || (r = new ResizeObserver((g) => {
      n = s.requestAnimationFrame(() => {
        const {
          width: p,
          height: b
        } = e;
        let c = p, h = b;
        g.forEach(({
          contentBoxSize: v,
          contentRect: x,
          target: d
        }) => {
          d && d !== e.el || (c = x ? x.width : (v[0] || v).inlineSize, h = x ? x.height : (v[0] || v).blockSize);
        }), (c !== p || h !== b) && l();
      });
    }), r.observe(e.el));
  }, a = () => {
    n && s.cancelAnimationFrame(n), r && r.unobserve && e.el && (r.unobserve(e.el), r = null);
  }, f = () => {
    !e || e.destroyed || !e.initialized || t("orientationchange");
  };
  i("init", () => {
    if (e.params.resizeObserver && typeof s.ResizeObserver < "u") {
      o();
      return;
    }
    s.addEventListener("resize", l), s.addEventListener("orientationchange", f);
  }), i("destroy", () => {
    a(), s.removeEventListener("resize", l), s.removeEventListener("orientationchange", f);
  });
}
function Xe({
  swiper: e,
  extendParams: i,
  on: t,
  emit: s
}) {
  const r = [], n = _(), l = (f, g = {}) => {
    const p = n.MutationObserver || n.WebkitMutationObserver, b = new p((c) => {
      if (e.__preventObserver__) return;
      if (c.length === 1) {
        s("observerUpdate", c[0]);
        return;
      }
      const h = function() {
        s("observerUpdate", c[0]);
      };
      n.requestAnimationFrame ? n.requestAnimationFrame(h) : n.setTimeout(h, 0);
    });
    b.observe(f, {
      attributes: typeof g.attributes > "u" ? !0 : g.attributes,
      childList: e.isElement || (typeof g.childList > "u" ? !0 : g).childList,
      characterData: typeof g.characterData > "u" ? !0 : g.characterData
    }), r.push(b);
  }, o = () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const f = xe(e.hostEl);
        for (let g = 0; g < f.length; g += 1)
          l(f[g]);
      }
      l(e.hostEl, {
        childList: e.params.observeSlideChildren
      }), l(e.wrapperEl, {
        attributes: !1
      });
    }
  }, a = () => {
    r.forEach((f) => {
      f.disconnect();
    }), r.splice(0, r.length);
  };
  i({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), t("init", o), t("destroy", a);
}
var Ue = {
  on(e, i, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof i != "function") return s;
    const r = t ? "unshift" : "push";
    return e.split(" ").forEach((n) => {
      s.eventsListeners[n] || (s.eventsListeners[n] = []), s.eventsListeners[n][r](i);
    }), s;
  },
  once(e, i, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof i != "function") return s;
    function r(...n) {
      s.off(e, r), r.__emitterProxy && delete r.__emitterProxy, i.apply(s, n);
    }
    return r.__emitterProxy = i, s.on(e, r, t);
  },
  onAny(e, i) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof e != "function") return t;
    const s = i ? "unshift" : "push";
    return t.eventsAnyListeners.indexOf(e) < 0 && t.eventsAnyListeners[s](e), t;
  },
  offAny(e) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || !i.eventsAnyListeners) return i;
    const t = i.eventsAnyListeners.indexOf(e);
    return t >= 0 && i.eventsAnyListeners.splice(t, 1), i;
  },
  off(e, i) {
    const t = this;
    return !t.eventsListeners || t.destroyed || !t.eventsListeners || e.split(" ").forEach((s) => {
      typeof i > "u" ? t.eventsListeners[s] = [] : t.eventsListeners[s] && t.eventsListeners[s].forEach((r, n) => {
        (r === i || r.__emitterProxy && r.__emitterProxy === i) && t.eventsListeners[s].splice(n, 1);
      });
    }), t;
  },
  emit(...e) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || !i.eventsListeners) return i;
    let t, s, r;
    return typeof e[0] == "string" || Array.isArray(e[0]) ? (t = e[0], s = e.slice(1, e.length), r = i) : (t = e[0].events, s = e[0].data, r = e[0].context || i), s.unshift(r), (Array.isArray(t) ? t : t.split(" ")).forEach((l) => {
      i.eventsAnyListeners && i.eventsAnyListeners.length && i.eventsAnyListeners.forEach((o) => {
        o.apply(r, [l, ...s]);
      }), i.eventsListeners && i.eventsListeners[l] && i.eventsListeners[l].forEach((o) => {
        o.apply(r, s);
      });
    }), i;
  }
};
function Ke() {
  const e = this;
  let i, t;
  const s = e.el;
  typeof e.params.width < "u" && e.params.width !== null ? i = e.params.width : i = s.clientWidth, typeof e.params.height < "u" && e.params.height !== null ? t = e.params.height : t = s.clientHeight, !(i === 0 && e.isHorizontal() || t === 0 && e.isVertical()) && (i = i - parseInt(H(s, "padding-left") || 0, 10) - parseInt(H(s, "padding-right") || 0, 10), t = t - parseInt(H(s, "padding-top") || 0, 10) - parseInt(H(s, "padding-bottom") || 0, 10), Number.isNaN(i) && (i = 0), Number.isNaN(t) && (t = 0), Object.assign(e, {
    width: i,
    height: t,
    size: e.isHorizontal() ? i : t
  }));
}
function Qe() {
  const e = this;
  function i(T, E) {
    return parseFloat(T.getPropertyValue(e.getDirectionLabel(E)) || 0);
  }
  const t = e.params, {
    wrapperEl: s,
    slidesEl: r,
    rtlTranslate: n,
    wrongRTL: l
  } = e, o = e.virtual && t.virtual.enabled, a = o ? e.virtual.slides.length : e.slides.length, f = V(r, `.${e.params.slideClass}, swiper-slide`), g = o ? e.virtual.slides.length : f.length;
  let p = [];
  const b = [], c = [];
  let h = t.slidesOffsetBefore;
  typeof h == "function" && (h = t.slidesOffsetBefore.call(e));
  let v = t.slidesOffsetAfter;
  typeof v == "function" && (v = t.slidesOffsetAfter.call(e));
  const x = e.snapGrid.length, d = e.slidesGrid.length, u = e.size - h - v;
  let m = t.spaceBetween, S = -h, w = 0, P = 0;
  if (typeof u > "u")
    return;
  typeof m == "string" && m.indexOf("%") >= 0 ? m = parseFloat(m.replace("%", "")) / 100 * u : typeof m == "string" && (m = parseFloat(m)), e.virtualSize = -m - h - v, f.forEach((T) => {
    n ? T.style.marginLeft = "" : T.style.marginRight = "", T.style.marginBottom = "", T.style.marginTop = "";
  }), t.centeredSlides && t.cssMode && (q(s, "--swiper-centered-offset-before", ""), q(s, "--swiper-centered-offset-after", "")), t.cssMode && (q(s, "--swiper-slides-offset-before", `${h}px`), q(s, "--swiper-slides-offset-after", `${v}px`));
  const M = t.grid && t.grid.rows > 1 && e.grid;
  M ? e.grid.initSlides(f) : e.grid && e.grid.unsetSlides();
  let y;
  const O = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter((T) => typeof t.breakpoints[T].slidesPerView < "u").length > 0;
  for (let T = 0; T < g; T += 1) {
    y = 0;
    const E = f[T];
    if (!(E && (M && e.grid.updateSlide(T, E, f), H(E, "display") === "none"))) {
      if (o && t.slidesPerView === "auto")
        t.virtual.slidesPerViewAutoSlideSize && (y = t.virtual.slidesPerViewAutoSlideSize), y && E && (t.roundLengths && (y = Math.floor(y)), E.style[e.getDirectionLabel("width")] = `${y}px`);
      else if (t.slidesPerView === "auto") {
        O && (E.style[e.getDirectionLabel("width")] = "");
        const C = getComputedStyle(E), L = E.style.transform, k = E.style.webkitTransform;
        if (L && (E.style.transform = "none"), k && (E.style.webkitTransform = "none"), t.roundLengths)
          y = e.isHorizontal() ? oe(E, "width") : oe(E, "height");
        else {
          const z = i(C, "width"), F = i(C, "padding-left"), R = i(C, "padding-right"), I = i(C, "margin-left"), G = i(C, "margin-right"), D = C.getPropertyValue("box-sizing");
          if (D && D === "border-box")
            y = z + I + G;
          else {
            const {
              clientWidth: N,
              offsetWidth: ke
            } = E;
            y = z + F + R + I + G + (ke - N);
          }
        }
        L && (E.style.transform = L), k && (E.style.webkitTransform = k), t.roundLengths && (y = Math.floor(y));
      } else
        y = (u - (t.slidesPerView - 1) * m) / t.slidesPerView, t.roundLengths && (y = Math.floor(y)), E && (E.style[e.getDirectionLabel("width")] = `${y}px`);
      E && (E.swiperSlideSize = y), c.push(y), t.centeredSlides ? (S = S + y / 2 + w / 2 + m, w === 0 && T !== 0 && (S = S - u / 2 - m), T === 0 && (S = S - u / 2 - m), Math.abs(S) < 1 / 1e3 && (S = 0), t.roundLengths && (S = Math.floor(S)), P % t.slidesPerGroup === 0 && p.push(S), b.push(S)) : (t.roundLengths && (S = Math.floor(S)), (P - Math.min(e.params.slidesPerGroupSkip, P)) % e.params.slidesPerGroup === 0 && p.push(S), b.push(S), S = S + y + m), e.virtualSize += y + m, w = y, P += 1;
    }
  }
  if (e.virtualSize = Math.max(e.virtualSize, u) + v, n && l && (t.effect === "slide" || t.effect === "coverflow") && (s.style.width = `${e.virtualSize + m}px`), t.setWrapperSize && (s.style[e.getDirectionLabel("width")] = `${e.virtualSize + m}px`), M && e.grid.updateWrapperSize(y, p), !t.centeredSlides) {
    const T = t.slidesPerView !== "auto" && t.slidesPerView % 1 !== 0, E = t.snapToSlideEdge && !t.loop && (t.slidesPerView === "auto" || T);
    let C = p.length;
    if (E) {
      let k;
      if (t.slidesPerView === "auto") {
        k = 1;
        let z = 0;
        for (let F = c.length - 1; F >= 0 && (z += c[F] + (F < c.length - 1 ? m : 0), z <= u); F -= 1)
          k = c.length - F;
      } else
        k = Math.floor(t.slidesPerView);
      C = Math.max(g - k, 0);
    }
    const L = [];
    for (let k = 0; k < p.length; k += 1) {
      let z = p[k];
      t.roundLengths && (z = Math.floor(z)), E ? k <= C && L.push(z) : p[k] <= e.virtualSize - u && L.push(z);
    }
    p = L, Math.floor(e.virtualSize - u) - Math.floor(p[p.length - 1]) > 1 && (E || p.push(e.virtualSize - u));
  }
  if (o && t.loop) {
    const T = c[0] + m;
    if (t.slidesPerGroup > 1) {
      const E = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / t.slidesPerGroup), C = T * t.slidesPerGroup;
      for (let L = 0; L < E; L += 1)
        p.push(p[p.length - 1] + C);
    }
    for (let E = 0; E < e.virtual.slidesBefore + e.virtual.slidesAfter; E += 1)
      t.slidesPerGroup === 1 && p.push(p[p.length - 1] + T), b.push(b[b.length - 1] + T), e.virtualSize += T;
  }
  if (p.length === 0 && (p = [0]), m !== 0) {
    const T = e.isHorizontal() && n ? "marginLeft" : e.getDirectionLabel("marginRight");
    f.filter((E, C) => !t.cssMode || t.loop ? !0 : C !== f.length - 1).forEach((E) => {
      E.style[T] = `${m}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let T = 0;
    c.forEach((C) => {
      T += C + (m || 0);
    }), T -= m;
    const E = T > u ? T - u : 0;
    p = p.map((C) => C <= 0 ? -h : C > E ? E + v : C);
  }
  if (t.centerInsufficientSlides) {
    let T = 0;
    if (c.forEach((E) => {
      T += E + (m || 0);
    }), T -= m, T < u) {
      const E = (u - T) / 2;
      p.forEach((C, L) => {
        p[L] = C - E;
      }), b.forEach((C, L) => {
        b[L] = C + E;
      });
    }
  }
  if (Object.assign(e, {
    slides: f,
    snapGrid: p,
    slidesGrid: b,
    slidesSizesGrid: c
  }), t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
    q(s, "--swiper-centered-offset-before", `${-p[0]}px`), q(s, "--swiper-centered-offset-after", `${e.size / 2 - c[c.length - 1] / 2}px`);
    const T = -e.snapGrid[0], E = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map((C) => C + T), e.slidesGrid = e.slidesGrid.map((C) => C + E);
  }
  if (g !== a && e.emit("slidesLengthChange"), p.length !== x && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), b.length !== d && e.emit("slidesGridLengthChange"), t.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !o && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
    const T = `${t.containerModifierClass}backface-hidden`, E = e.el.classList.contains(T);
    g <= t.maxBackfaceHiddenSlides ? E || e.el.classList.add(T) : E && e.el.classList.remove(T);
  }
}
function Ze(e) {
  const i = this, t = [], s = i.virtual && i.params.virtual.enabled;
  let r = 0, n;
  typeof e == "number" ? i.setTransition(e) : e === !0 && i.setTransition(i.params.speed);
  const l = (o) => s ? i.slides[i.getSlideIndexByData(o)] : i.slides[o];
  if (i.params.slidesPerView !== "auto" && i.params.slidesPerView > 1)
    if (i.params.centeredSlides)
      (i.visibleSlides || []).forEach((o) => {
        t.push(o);
      });
    else
      for (n = 0; n < Math.ceil(i.params.slidesPerView); n += 1) {
        const o = i.activeIndex + n;
        if (o > i.slides.length && !s) break;
        t.push(l(o));
      }
  else
    t.push(l(i.activeIndex));
  for (n = 0; n < t.length; n += 1)
    if (typeof t[n] < "u") {
      const o = t[n].offsetHeight;
      r = o > r ? o : r;
    }
  (r || r === 0) && (i.wrapperEl.style.height = `${r}px`);
}
function Je() {
  const e = this, i = e.slides, t = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
  for (let s = 0; s < i.length; s += 1)
    i[s].swiperSlideOffset = (e.isHorizontal() ? i[s].offsetLeft : i[s].offsetTop) - t - e.cssOverflowAdjustment();
}
const pe = (e, i, t) => {
  i && !e.classList.contains(t) ? e.classList.add(t) : !i && e.classList.contains(t) && e.classList.remove(t);
};
function et(e = this && this.translate || 0) {
  const i = this, t = i.params, {
    slides: s,
    rtlTranslate: r,
    snapGrid: n
  } = i;
  if (s.length === 0) return;
  typeof s[0].swiperSlideOffset > "u" && i.updateSlidesOffset();
  let l = -e;
  r && (l = e), i.visibleSlidesIndexes = [], i.visibleSlides = [];
  let o = t.spaceBetween;
  typeof o == "string" && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * i.size : typeof o == "string" && (o = parseFloat(o));
  for (let a = 0; a < s.length; a += 1) {
    const f = s[a];
    let g = f.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (g -= s[0].swiperSlideOffset);
    const p = (l + (t.centeredSlides ? i.minTranslate() : 0) - g) / (f.swiperSlideSize + o), b = (l - n[0] + (t.centeredSlides ? i.minTranslate() : 0) - g) / (f.swiperSlideSize + o), c = -(l - g), h = c + i.slidesSizesGrid[a], v = c >= 0 && c <= i.size - i.slidesSizesGrid[a], x = c >= 0 && c < i.size - 1 || h > 1 && h <= i.size || c <= 0 && h >= i.size;
    x && (i.visibleSlides.push(f), i.visibleSlidesIndexes.push(a)), pe(f, x, t.slideVisibleClass), pe(f, v, t.slideFullyVisibleClass), f.progress = r ? -p : p, f.originalProgress = r ? -b : b;
  }
}
function tt(e) {
  const i = this;
  if (typeof e > "u") {
    const g = i.rtlTranslate ? -1 : 1;
    e = i && i.translate && i.translate * g || 0;
  }
  const t = i.params, s = i.maxTranslate() - i.minTranslate();
  let {
    progress: r,
    isBeginning: n,
    isEnd: l,
    progressLoop: o
  } = i;
  const a = n, f = l;
  if (s === 0)
    r = 0, n = !0, l = !0;
  else {
    r = (e - i.minTranslate()) / s;
    const g = Math.abs(e - i.minTranslate()) < 1, p = Math.abs(e - i.maxTranslate()) < 1;
    n = g || r <= 0, l = p || r >= 1, g && (r = 0), p && (r = 1);
  }
  if (t.loop) {
    const g = i.getSlideIndexByData(0), p = i.getSlideIndexByData(i.slides.length - 1), b = i.slidesGrid[g], c = i.slidesGrid[p], h = i.slidesGrid[i.slidesGrid.length - 1], v = Math.abs(e);
    v >= b ? o = (v - b) / h : o = (v + h - c) / h, o > 1 && (o -= 1);
  }
  Object.assign(i, {
    progress: r,
    progressLoop: o,
    isBeginning: n,
    isEnd: l
  }), (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && i.updateSlidesProgress(e), n && !a && i.emit("reachBeginning toEdge"), l && !f && i.emit("reachEnd toEdge"), (a && !n || f && !l) && i.emit("fromEdge"), i.emit("progress", r);
}
const ne = (e, i, t) => {
  i && !e.classList.contains(t) ? e.classList.add(t) : !i && e.classList.contains(t) && e.classList.remove(t);
};
function it() {
  const e = this, {
    slides: i,
    params: t,
    slidesEl: s,
    activeIndex: r
  } = e, n = e.virtual && t.virtual.enabled, l = e.grid && t.grid && t.grid.rows > 1, o = (p) => V(s, `.${t.slideClass}${p}, swiper-slide${p}`)[0];
  let a, f, g;
  if (n)
    if (t.loop) {
      let p = r - e.virtual.slidesBefore;
      p < 0 && (p = e.virtual.slides.length + p), p >= e.virtual.slides.length && (p -= e.virtual.slides.length), a = o(`[data-swiper-slide-index="${p}"]`);
    } else
      a = o(`[data-swiper-slide-index="${r}"]`);
  else
    l ? (a = i.find((p) => p.column === r), g = i.find((p) => p.column === r + 1), f = i.find((p) => p.column === r - 1)) : a = i[r];
  a && (l || (g = Re(a, `.${t.slideClass}, swiper-slide`)[0], t.loop && !g && (g = i[0]), f = He(a, `.${t.slideClass}, swiper-slide`)[0], t.loop && !f === 0 && (f = i[i.length - 1]))), i.forEach((p) => {
    ne(p, p === a, t.slideActiveClass), ne(p, p === g, t.slideNextClass), ne(p, p === f, t.slidePrevClass);
  }), e.emitSlidesClasses();
}
const U = (e, i) => {
  if (!e || e.destroyed || !e.params) return;
  const t = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`, s = i.closest(t());
  if (s) {
    let r = s.querySelector(`.${e.params.lazyPreloaderClass}`);
    !r && e.isElement && (s.shadowRoot ? r = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      s.shadowRoot && (r = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), r && !r.lazyPreloaderManaged && r.remove());
    })), r && !r.lazyPreloaderManaged && r.remove();
  }
}, re = (e, i) => {
  if (!e.slides[i]) return;
  const t = e.slides[i].querySelector('[loading="lazy"]');
  t && t.removeAttribute("loading");
}, ce = (e) => {
  if (!e || e.destroyed || !e.params) return;
  let i = e.params.lazyPreloadPrevNext;
  const t = e.slides.length;
  if (!t || !i || i < 0) return;
  i = Math.min(i, t);
  const s = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), r = e.activeIndex;
  if (e.params.grid && e.params.grid.rows > 1) {
    const l = r, o = [l - i];
    o.push(...Array.from({
      length: i
    }).map((a, f) => l + s + f)), e.slides.forEach((a, f) => {
      o.includes(a.column) && re(e, f);
    });
    return;
  }
  const n = r + s - 1;
  if (e.params.rewind || e.params.loop)
    for (let l = r - i; l <= n + i; l += 1) {
      const o = (l % t + t) % t;
      (o < r || o > n) && re(e, o);
    }
  else
    for (let l = Math.max(r - i, 0); l <= Math.min(n + i, t - 1); l += 1)
      l !== r && (l > n || l < r) && re(e, l);
};
function st(e) {
  const {
    slidesGrid: i,
    params: t
  } = e, s = e.rtlTranslate ? e.translate : -e.translate;
  let r;
  for (let n = 0; n < i.length; n += 1)
    typeof i[n + 1] < "u" ? s >= i[n] && s < i[n + 1] - (i[n + 1] - i[n]) / 2 ? r = n : s >= i[n] && s < i[n + 1] && (r = n + 1) : s >= i[n] && (r = n);
  return t.normalizeSlideIndex && (r < 0 || typeof r > "u") && (r = 0), r;
}
function nt(e) {
  const i = this, t = i.rtlTranslate ? i.translate : -i.translate, {
    snapGrid: s,
    params: r,
    activeIndex: n,
    realIndex: l,
    snapIndex: o
  } = i;
  let a = e, f;
  const g = (c) => {
    let h = c - i.virtual.slidesBefore;
    return h < 0 && (h = i.virtual.slides.length + h), h >= i.virtual.slides.length && (h -= i.virtual.slides.length), h;
  };
  if (typeof a > "u" && (a = st(i)), s.indexOf(t) >= 0)
    f = s.indexOf(t);
  else {
    const c = Math.min(r.slidesPerGroupSkip, a);
    f = c + Math.floor((a - c) / r.slidesPerGroup);
  }
  if (f >= s.length && (f = s.length - 1), a === n && !i.params.loop) {
    f !== o && (i.snapIndex = f, i.emit("snapIndexChange"));
    return;
  }
  if (a === n && i.params.loop && i.virtual && i.params.virtual.enabled) {
    i.realIndex = g(a);
    return;
  }
  const p = i.grid && r.grid && r.grid.rows > 1;
  let b;
  if (i.virtual && r.virtual.enabled)
    r.loop ? b = g(a) : b = a;
  else if (p) {
    const c = i.slides.find((v) => v.column === a);
    let h = parseInt(c.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(h) && (h = Math.max(i.slides.indexOf(c), 0)), b = Math.floor(h / r.grid.rows);
  } else if (i.slides[a]) {
    const c = i.slides[a].getAttribute("data-swiper-slide-index");
    c ? b = parseInt(c, 10) : b = a;
  } else
    b = a;
  Object.assign(i, {
    previousSnapIndex: o,
    snapIndex: f,
    previousRealIndex: l,
    realIndex: b,
    previousIndex: n,
    activeIndex: a
  }), i.initialized && ce(i), i.emit("activeIndexChange"), i.emit("snapIndexChange"), (i.initialized || i.params.runCallbacksOnInit) && (l !== b && i.emit("realIndexChange"), i.emit("slideChange"));
}
function rt(e, i) {
  const t = this, s = t.params;
  let r = e.closest(`.${s.slideClass}, swiper-slide`);
  !r && t.isElement && i && i.length > 1 && i.includes(e) && [...i.slice(i.indexOf(e) + 1, i.length)].forEach((o) => {
    !r && o.matches && o.matches(`.${s.slideClass}, swiper-slide`) && (r = o);
  });
  let n = !1, l;
  if (r) {
    for (let o = 0; o < t.slides.length; o += 1)
      if (t.slides[o] === r) {
        n = !0, l = o;
        break;
      }
  }
  if (r && n)
    t.clickedSlide = r, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(r.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = l;
  else {
    t.clickedSlide = void 0, t.clickedIndex = void 0;
    return;
  }
  s.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
}
var at = {
  updateSize: Ke,
  updateSlides: Qe,
  updateAutoHeight: Ze,
  updateSlidesOffset: Je,
  updateSlidesProgress: et,
  updateProgress: tt,
  updateSlidesClasses: it,
  updateActiveIndex: nt,
  updateClickedSlide: rt
};
function lt(e = this.isHorizontal() ? "x" : "y") {
  const i = this, {
    params: t,
    rtlTranslate: s,
    translate: r,
    wrapperEl: n
  } = i;
  if (t.virtualTranslate)
    return s ? -r : r;
  if (t.cssMode)
    return r;
  let l = $e(n, e);
  return l += i.cssOverflowAdjustment(), s && (l = -l), l || 0;
}
function ot(e, i) {
  const t = this, {
    rtlTranslate: s,
    params: r,
    wrapperEl: n,
    progress: l
  } = t;
  let o = 0, a = 0;
  const f = 0;
  t.isHorizontal() ? o = s ? -e : e : a = e, r.roundLengths && (o = Math.floor(o), a = Math.floor(a)), t.previousTranslate = t.translate, t.translate = t.isHorizontal() ? o : a, r.cssMode ? n[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -o : -a : r.virtualTranslate || (t.isHorizontal() ? o -= t.cssOverflowAdjustment() : a -= t.cssOverflowAdjustment(), n.style.transform = `translate3d(${o}px, ${a}px, ${f}px)`);
  let g;
  const p = t.maxTranslate() - t.minTranslate();
  p === 0 ? g = 0 : g = (e - t.minTranslate()) / p, g !== l && t.updateProgress(e), t.emit("setTranslate", t.translate, i);
}
function dt() {
  return -this.snapGrid[0];
}
function ct() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function ft(e = 0, i = this.params.speed, t = !0, s = !0, r) {
  const n = this, {
    params: l,
    wrapperEl: o
  } = n;
  if (n.animating && l.preventInteractionOnTransition)
    return !1;
  const a = n.minTranslate(), f = n.maxTranslate();
  let g;
  if (s && e > a ? g = a : s && e < f ? g = f : g = e, n.updateProgress(g), l.cssMode) {
    const p = n.isHorizontal();
    if (i === 0)
      o[p ? "scrollLeft" : "scrollTop"] = -g;
    else {
      if (!n.support.smoothScroll)
        return we({
          swiper: n,
          targetPosition: -g,
          side: p ? "left" : "top"
        }), !0;
      o.scrollTo({
        [p ? "left" : "top"]: -g,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return i === 0 ? (n.setTransition(0), n.setTranslate(g), t && (n.emit("beforeTransitionStart", i, r), n.emit("transitionEnd"))) : (n.setTransition(i), n.setTranslate(g), t && (n.emit("beforeTransitionStart", i, r), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(b) {
    !n || n.destroyed || b.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, n.animating = !1, t && n.emit("transitionEnd"));
  }), n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))), !0;
}
var ut = {
  getTranslate: lt,
  setTranslate: ot,
  minTranslate: dt,
  maxTranslate: ct,
  translateTo: ft
};
function pt(e, i) {
  const t = this;
  t.params.cssMode || (t.wrapperEl.style.transitionDuration = `${e}ms`, t.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : ""), t.emit("setTransition", e, i);
}
function Me({
  swiper: e,
  runCallbacks: i,
  direction: t,
  step: s
}) {
  const {
    activeIndex: r,
    previousIndex: n
  } = e;
  let l = t;
  l || (r > n ? l = "next" : r < n ? l = "prev" : l = "reset"), e.emit(`transition${s}`), i && l === "reset" ? e.emit(`slideResetTransition${s}`) : i && r !== n && (e.emit(`slideChangeTransition${s}`), l === "next" ? e.emit(`slideNextTransition${s}`) : e.emit(`slidePrevTransition${s}`));
}
function mt(e = !0, i) {
  const t = this, {
    params: s
  } = t;
  s.cssMode || (s.autoHeight && t.updateAutoHeight(), Me({
    swiper: t,
    runCallbacks: e,
    direction: i,
    step: "Start"
  }));
}
function ht(e = !0, i) {
  const t = this, {
    params: s
  } = t;
  t.animating = !1, !s.cssMode && (t.setTransition(0), Me({
    swiper: t,
    runCallbacks: e,
    direction: i,
    step: "End"
  }));
}
var gt = {
  setTransition: pt,
  transitionStart: mt,
  transitionEnd: ht
};
function vt(e = 0, i, t = !0, s, r) {
  typeof e == "string" && (e = parseInt(e, 10));
  const n = this;
  let l = e;
  l < 0 && (l = 0);
  const {
    params: o,
    snapGrid: a,
    slidesGrid: f,
    previousIndex: g,
    activeIndex: p,
    rtlTranslate: b,
    wrapperEl: c,
    enabled: h
  } = n;
  if (!h && !s && !r || n.destroyed || n.animating && o.preventInteractionOnTransition)
    return !1;
  typeof i > "u" && (i = n.params.speed);
  const v = Math.min(n.params.slidesPerGroupSkip, l);
  let x = v + Math.floor((l - v) / n.params.slidesPerGroup);
  x >= a.length && (x = a.length - 1);
  const d = -a[x];
  if (o.normalizeSlideIndex)
    for (let M = 0; M < f.length; M += 1) {
      const y = -Math.floor(d * 100), O = Math.floor(f[M] * 100), T = Math.floor(f[M + 1] * 100);
      typeof f[M + 1] < "u" ? y >= O && y < T - (T - O) / 2 ? l = M : y >= O && y < T && (l = M + 1) : y >= O && (l = M);
    }
  if (n.initialized && l !== p && (!n.allowSlideNext && (b ? d > n.translate && d > n.minTranslate() : d < n.translate && d < n.minTranslate()) || !n.allowSlidePrev && d > n.translate && d > n.maxTranslate() && (p || 0) !== l))
    return !1;
  l !== (g || 0) && t && n.emit("beforeSlideChangeStart"), n.updateProgress(d);
  let u;
  l > p ? u = "next" : l < p ? u = "prev" : u = "reset";
  const m = n.virtual && n.params.virtual.enabled;
  if (!(m && r) && (b && -d === n.translate || !b && d === n.translate))
    return n.updateActiveIndex(l), o.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), o.effect !== "slide" && n.setTranslate(d), u !== "reset" && (n.transitionStart(t, u), n.transitionEnd(t, u)), !1;
  if (o.cssMode) {
    const M = n.isHorizontal(), y = b ? d : -d;
    if (i === 0)
      m && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), m && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        c[M ? "scrollLeft" : "scrollTop"] = y;
      })) : c[M ? "scrollLeft" : "scrollTop"] = y, m && requestAnimationFrame(() => {
        n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1;
      });
    else {
      if (!n.support.smoothScroll)
        return we({
          swiper: n,
          targetPosition: y,
          side: M ? "left" : "top"
        }), !0;
      c.scrollTo({
        [M ? "left" : "top"]: y,
        behavior: "smooth"
      });
    }
    return !0;
  }
  const P = Ce().isSafari;
  return m && !r && P && n.isElement && n.virtual.update(!1, !1, l), n.setTransition(i), n.setTranslate(d), n.updateActiveIndex(l), n.updateSlidesClasses(), n.emit("beforeTransitionStart", i, s), n.transitionStart(t, u), i === 0 ? n.transitionEnd(t, u) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(y) {
    !n || n.destroyed || y.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(t, u));
  }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0;
}
function bt(e = 0, i, t = !0, s) {
  typeof e == "string" && (e = parseInt(e, 10));
  const r = this;
  if (r.destroyed) return;
  typeof i > "u" && (i = r.params.speed);
  const n = r.grid && r.params.grid && r.params.grid.rows > 1;
  let l = e;
  if (r.params.loop)
    if (r.virtual && r.params.virtual.enabled)
      l = l + r.virtual.slidesBefore;
    else {
      let o;
      if (n) {
        const v = l * r.params.grid.rows;
        o = r.slides.find((x) => x.getAttribute("data-swiper-slide-index") * 1 === v).column;
      } else
        o = r.getSlideIndexByData(l);
      const a = n ? Math.ceil(r.slides.length / r.params.grid.rows) : r.slides.length, {
        centeredSlides: f,
        slidesOffsetBefore: g,
        slidesOffsetAfter: p
      } = r.params, b = f || !!g || !!p;
      let c = r.params.slidesPerView;
      c === "auto" ? c = r.slidesPerViewDynamic() : (c = Math.ceil(parseFloat(r.params.slidesPerView, 10)), b && c % 2 === 0 && (c = c + 1));
      let h = a - o < c;
      if (b && (h = h || o < Math.ceil(c / 2)), s && b && r.params.slidesPerView !== "auto" && !n && (h = !1), h) {
        const v = b ? o < r.activeIndex ? "prev" : "next" : o - r.activeIndex - 1 < r.params.slidesPerView ? "next" : "prev";
        r.loopFix({
          direction: v,
          slideTo: !0,
          activeSlideIndex: v === "next" ? o + 1 : o - a + 1,
          slideRealIndex: v === "next" ? r.realIndex : void 0
        });
      }
      if (n) {
        const v = l * r.params.grid.rows;
        l = r.slides.find((x) => x.getAttribute("data-swiper-slide-index") * 1 === v).column;
      } else
        l = r.getSlideIndexByData(l);
    }
  return requestAnimationFrame(() => {
    r.slideTo(l, i, t, s);
  }), r;
}
function St(e, i = !0, t) {
  const s = this, {
    enabled: r,
    params: n,
    animating: l
  } = s;
  if (!r || s.destroyed) return s;
  typeof e > "u" && (e = s.params.speed);
  let o = n.slidesPerGroup;
  n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (o = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const a = s.activeIndex < n.slidesPerGroupSkip ? 1 : o, f = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (l && !f && n.loopPreventsSliding) return !1;
    if (s.loopFix({
      direction: "next"
    }), s._clientLeft = s.wrapperEl.clientLeft, s.activeIndex === s.slides.length - 1 && n.cssMode)
      return requestAnimationFrame(() => {
        s.slideTo(s.activeIndex + a, e, i, t);
      }), !0;
  }
  return n.rewind && s.isEnd ? s.slideTo(0, e, i, t) : s.slideTo(s.activeIndex + a, e, i, t);
}
function yt(e, i = !0, t) {
  const s = this, {
    params: r,
    snapGrid: n,
    slidesGrid: l,
    rtlTranslate: o,
    enabled: a,
    animating: f
  } = s;
  if (!a || s.destroyed) return s;
  typeof e > "u" && (e = s.params.speed);
  const g = s.virtual && r.virtual.enabled;
  if (r.loop) {
    if (f && !g && r.loopPreventsSliding) return !1;
    s.loopFix({
      direction: "prev"
    }), s._clientLeft = s.wrapperEl.clientLeft;
  }
  const p = o ? s.translate : -s.translate;
  function b(u) {
    return u < 0 ? -Math.floor(Math.abs(u)) : Math.floor(u);
  }
  const c = b(p), h = n.map((u) => b(u)), v = r.freeMode && r.freeMode.enabled;
  let x = n[h.indexOf(c) - 1];
  if (typeof x > "u" && (r.cssMode || v)) {
    let u;
    n.forEach((m, S) => {
      c >= m && (u = S);
    }), typeof u < "u" && (x = v ? n[u] : n[u > 0 ? u - 1 : u]);
  }
  let d = 0;
  if (typeof x < "u" && (d = l.indexOf(x), d < 0 && (d = s.activeIndex - 1), r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (d = d - s.slidesPerViewDynamic("previous", !0) + 1, d = Math.max(d, 0))), r.rewind && s.isBeginning) {
    const u = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
    return s.slideTo(u, e, i, t);
  } else if (r.loop && s.activeIndex === 0 && r.cssMode)
    return requestAnimationFrame(() => {
      s.slideTo(d, e, i, t);
    }), !0;
  return s.slideTo(d, e, i, t);
}
function wt(e, i = !0, t) {
  const s = this;
  if (!s.destroyed)
    return typeof e > "u" && (e = s.params.speed), s.slideTo(s.activeIndex, e, i, t);
}
function xt(e, i = !0, t, s = 0.5) {
  const r = this;
  if (r.destroyed) return;
  typeof e > "u" && (e = r.params.speed);
  let n = r.activeIndex;
  const l = Math.min(r.params.slidesPerGroupSkip, n), o = l + Math.floor((n - l) / r.params.slidesPerGroup), a = r.rtlTranslate ? r.translate : -r.translate;
  if (a >= r.snapGrid[o]) {
    const f = r.snapGrid[o], g = r.snapGrid[o + 1];
    a - f > (g - f) * s && (n += r.params.slidesPerGroup);
  } else {
    const f = r.snapGrid[o - 1], g = r.snapGrid[o];
    a - f <= (g - f) * s && (n -= r.params.slidesPerGroup);
  }
  return n = Math.max(n, 0), n = Math.min(n, r.slidesGrid.length - 1), r.slideTo(n, e, i, t);
}
function Tt() {
  const e = this;
  if (e.destroyed) return;
  const {
    params: i,
    slidesEl: t
  } = e, s = i.slidesPerView === "auto" ? e.slidesPerViewDynamic() : i.slidesPerView;
  let r = e.getSlideIndexWhenGrid(e.clickedIndex), n;
  const l = e.isElement ? "swiper-slide" : `.${i.slideClass}`, o = e.grid && e.params.grid && e.params.grid.rows > 1;
  if (i.loop) {
    if (e.animating) return;
    n = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), i.centeredSlides ? e.slideToLoop(n) : r > (o ? (e.slides.length - s) / 2 - (e.params.grid.rows - 1) : e.slides.length - s) ? (e.loopFix(), r = e.getSlideIndex(V(t, `${l}[data-swiper-slide-index="${n}"]`)[0]), ye(() => {
      e.slideTo(r);
    })) : e.slideTo(r);
  } else
    e.slideTo(r);
}
var Et = {
  slideTo: vt,
  slideToLoop: bt,
  slideNext: St,
  slidePrev: yt,
  slideReset: wt,
  slideToClosest: xt,
  slideToClickedSlide: Tt
};
function Ct(e, i) {
  const t = this, {
    params: s,
    slidesEl: r
  } = t;
  if (!s.loop || t.virtual && t.params.virtual.enabled) return;
  const n = () => {
    V(r, `.${s.slideClass}, swiper-slide`).forEach((h, v) => {
      h.setAttribute("data-swiper-slide-index", v);
    });
  }, l = () => {
    const c = V(r, `.${s.slideBlankClass}`);
    c.forEach((h) => {
      h.remove();
    }), c.length > 0 && (t.recalcSlides(), t.updateSlides());
  }, o = t.grid && s.grid && s.grid.rows > 1;
  s.loopAddBlankSlides && (s.slidesPerGroup > 1 || o) && l();
  const a = s.slidesPerGroup * (o ? s.grid.rows : 1), f = t.slides.length % a !== 0, g = o && t.slides.length % s.grid.rows !== 0, p = (c) => {
    for (let h = 0; h < c; h += 1) {
      const v = t.isElement ? Z("swiper-slide", [s.slideBlankClass]) : Z("div", [s.slideClass, s.slideBlankClass]);
      t.slidesEl.append(v);
    }
  };
  if (f) {
    if (s.loopAddBlankSlides) {
      const c = a - t.slides.length % a;
      p(c), t.recalcSlides(), t.updateSlides();
    } else
      Q("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n();
  } else if (g) {
    if (s.loopAddBlankSlides) {
      const c = s.grid.rows - t.slides.length % s.grid.rows;
      p(c), t.recalcSlides(), t.updateSlides();
    } else
      Q("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n();
  } else
    n();
  const b = s.centeredSlides || !!s.slidesOffsetBefore || !!s.slidesOffsetAfter;
  t.loopFix({
    slideRealIndex: e,
    direction: b ? void 0 : "next",
    initial: i
  });
}
function Mt({
  slideRealIndex: e,
  slideTo: i = !0,
  direction: t,
  setTranslate: s,
  activeSlideIndex: r,
  initial: n,
  byController: l,
  byMousewheel: o
} = {}) {
  const a = this;
  if (!a.params.loop) return;
  a.emit("beforeLoopFix");
  const {
    slides: f,
    allowSlidePrev: g,
    allowSlideNext: p,
    slidesEl: b,
    params: c
  } = a, {
    centeredSlides: h,
    slidesOffsetBefore: v,
    slidesOffsetAfter: x,
    initialSlide: d
  } = c, u = h || !!v || !!x;
  if (a.allowSlidePrev = !0, a.allowSlideNext = !0, a.virtual && c.virtual.enabled) {
    i && (!u && a.snapIndex === 0 ? a.slideTo(a.virtual.slides.length, 0, !1, !0) : u && a.snapIndex < c.slidesPerView ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0) : a.snapIndex === a.snapGrid.length - 1 && a.slideTo(a.virtual.slidesBefore, 0, !1, !0)), a.allowSlidePrev = g, a.allowSlideNext = p, a.emit("loopFix");
    return;
  }
  let m = c.slidesPerView;
  m === "auto" ? m = a.slidesPerViewDynamic() : (m = Math.ceil(parseFloat(c.slidesPerView, 10)), u && m % 2 === 0 && (m = m + 1));
  const S = c.slidesPerGroupAuto ? m : c.slidesPerGroup;
  let w = u ? Math.max(S, Math.ceil(m / 2)) : S;
  w % S !== 0 && (w += S - w % S), w += c.loopAdditionalSlides, a.loopedSlides = w;
  const P = a.grid && c.grid && c.grid.rows > 1;
  f.length < m + w || a.params.effect === "cards" && f.length < m + w * 2 ? Q("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : P && c.grid.fill === "row" && Q("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const M = [], y = [], O = P ? Math.ceil(f.length / c.grid.rows) : f.length, T = n && O - d < m && !u;
  let E = T ? d : a.activeIndex;
  typeof r > "u" ? r = a.getSlideIndex(f.find((I) => I.classList.contains(c.slideActiveClass))) : E = r;
  const C = t === "next" || !t, L = t === "prev" || !t;
  let k = 0, z = 0;
  const R = (P ? f[r].column : r) + (u && typeof s > "u" ? -m / 2 + 0.5 : 0);
  if (R < w) {
    k = Math.max(w - R, S);
    for (let I = 0; I < w - R; I += 1) {
      const G = I - Math.floor(I / O) * O;
      if (P) {
        const D = O - G - 1;
        for (let N = f.length - 1; N >= 0; N -= 1)
          f[N].column === D && M.push(N);
      } else
        M.push(O - G - 1);
    }
  } else if (R + m > O - w) {
    z = Math.max(R - (O - w * 2), S), T && (z = Math.max(z, m - O + d + 1));
    for (let I = 0; I < z; I += 1) {
      const G = I - Math.floor(I / O) * O;
      P ? f.forEach((D, N) => {
        D.column === G && y.push(N);
      }) : y.push(G);
    }
  }
  if (a.__preventObserver__ = !0, requestAnimationFrame(() => {
    a.__preventObserver__ = !1;
  }), a.params.effect === "cards" && f.length < m + w * 2 && (y.includes(r) && y.splice(y.indexOf(r), 1), M.includes(r) && M.splice(M.indexOf(r), 1)), L && M.forEach((I) => {
    f[I].swiperLoopMoveDOM = !0, b.prepend(f[I]), f[I].swiperLoopMoveDOM = !1;
  }), C && y.forEach((I) => {
    f[I].swiperLoopMoveDOM = !0, b.append(f[I]), f[I].swiperLoopMoveDOM = !1;
  }), a.recalcSlides(), c.slidesPerView === "auto" ? a.updateSlides() : P && (M.length > 0 && L || y.length > 0 && C) && a.slides.forEach((I, G) => {
    a.grid.updateSlide(G, I, a.slides);
  }), c.watchSlidesProgress && a.updateSlidesOffset(), i) {
    if (M.length > 0 && L) {
      if (typeof e > "u") {
        const I = a.slidesGrid[E], D = a.slidesGrid[E + k] - I;
        o ? a.setTranslate(a.translate - D) : (a.slideTo(E + Math.ceil(k), 0, !1, !0), s && (a.touchEventsData.startTranslate = a.touchEventsData.startTranslate - D, a.touchEventsData.currentTranslate = a.touchEventsData.currentTranslate - D));
      } else if (s) {
        const I = P ? M.length / c.grid.rows : M.length;
        a.slideTo(a.activeIndex + I, 0, !1, !0), a.touchEventsData.currentTranslate = a.translate;
      }
    } else if (y.length > 0 && C)
      if (typeof e > "u") {
        const I = a.slidesGrid[E], D = a.slidesGrid[E - z] - I;
        o ? a.setTranslate(a.translate - D) : (a.slideTo(E - z, 0, !1, !0), s && (a.touchEventsData.startTranslate = a.touchEventsData.startTranslate - D, a.touchEventsData.currentTranslate = a.touchEventsData.currentTranslate - D));
      } else {
        const I = P ? y.length / c.grid.rows : y.length;
        a.slideTo(a.activeIndex - I, 0, !1, !0);
      }
  }
  if (a.allowSlidePrev = g, a.allowSlideNext = p, a.controller && a.controller.control && !l) {
    const I = {
      slideRealIndex: e,
      direction: t,
      setTranslate: s,
      activeSlideIndex: r,
      byController: !0
    };
    Array.isArray(a.controller.control) ? a.controller.control.forEach((G) => {
      !G.destroyed && G.params.loop && G.loopFix({
        ...I,
        slideTo: G.params.slidesPerView === c.slidesPerView ? i : !1
      });
    }) : a.controller.control instanceof a.constructor && a.controller.control.params.loop && a.controller.control.loopFix({
      ...I,
      slideTo: a.controller.control.params.slidesPerView === c.slidesPerView ? i : !1
    });
  }
  a.emit("loopFix");
}
function Pt() {
  const e = this, {
    params: i,
    slidesEl: t
  } = e;
  if (!i.loop || !t || e.virtual && e.params.virtual.enabled) return;
  e.recalcSlides();
  const s = [];
  e.slides.forEach((r) => {
    const n = typeof r.swiperSlideIndex > "u" ? r.getAttribute("data-swiper-slide-index") * 1 : r.swiperSlideIndex;
    s[n] = r;
  }), e.slides.forEach((r) => {
    r.removeAttribute("data-swiper-slide-index");
  }), s.forEach((r) => {
    t.append(r);
  }), e.recalcSlides(), e.slideTo(e.realIndex, 0);
}
var Lt = {
  loopCreate: Ct,
  loopFix: Mt,
  loopDestroy: Pt
};
function It(e) {
  const i = this;
  if (!i.params.simulateTouch || i.params.watchOverflow && i.isLocked || i.params.cssMode) return;
  const t = i.params.touchEventsTarget === "container" ? i.el : i.wrapperEl;
  i.isElement && (i.__preventObserver__ = !0), t.style.cursor = "move", t.style.cursor = e ? "grabbing" : "grab", i.isElement && requestAnimationFrame(() => {
    i.__preventObserver__ = !1;
  });
}
function kt() {
  const e = this;
  e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1;
  }));
}
var Ot = {
  setGrabCursor: It,
  unsetGrabCursor: kt
};
function zt(e, i = this) {
  function t(s) {
    if (!s || s === j() || s === _()) return null;
    s.assignedSlot && (s = s.assignedSlot);
    const r = s.closest(e);
    return !r && !s.getRootNode ? null : r || t(s.getRootNode().host);
  }
  return t(i);
}
function me(e, i, t) {
  const s = _(), {
    params: r
  } = e, n = r.edgeSwipeDetection, l = r.edgeSwipeThreshold;
  return n && (t <= l || t >= s.innerWidth - l) ? n === "prevent" ? (i.preventDefault(), !0) : !1 : !0;
}
function At(e) {
  const i = this, t = j();
  let s = e;
  s.originalEvent && (s = s.originalEvent);
  const r = i.touchEventsData;
  if (s.type === "pointerdown") {
    if (r.pointerId !== null && r.pointerId !== s.pointerId)
      return;
    r.pointerId = s.pointerId;
  } else s.type === "touchstart" && s.targetTouches.length === 1 && (r.touchId = s.targetTouches[0].identifier);
  if (s.type === "touchstart") {
    me(i, s, s.targetTouches[0].pageX);
    return;
  }
  const {
    params: n,
    touches: l,
    enabled: o
  } = i;
  if (!o || !n.simulateTouch && s.pointerType === "mouse" || i.animating && n.preventInteractionOnTransition)
    return;
  !i.animating && n.cssMode && n.loop && i.loopFix();
  let a = s.target;
  if (n.touchEventsTarget === "wrapper" && !Ne(a, i.wrapperEl) || "which" in s && s.which === 3 || "button" in s && s.button > 0 || r.isTouched && r.isMoved) return;
  const f = !!n.noSwipingClass && n.noSwipingClass !== "", g = s.composedPath ? s.composedPath() : s.path;
  f && s.target && s.target.shadowRoot && g && (a = g[0]);
  const p = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`, b = !!(s.target && s.target.shadowRoot);
  if (n.noSwiping && (b ? zt(p, a) : a.closest(p))) {
    i.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !a.closest(n.swipeHandler))
    return;
  l.currentX = s.pageX, l.currentY = s.pageY;
  const c = l.currentX, h = l.currentY;
  if (!me(i, s, c))
    return;
  Object.assign(r, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), l.startX = c, l.startY = h, r.touchStartTime = K(), i.allowClick = !0, i.updateSize(), i.swipeDirection = void 0, n.threshold > 0 && (r.allowThresholdMove = !1);
  let v = !0;
  a.matches(r.focusableElements) && (v = !1, a.nodeName === "SELECT" && (r.isTouched = !1)), t.activeElement && t.activeElement.matches(r.focusableElements) && t.activeElement !== a && (s.pointerType === "mouse" || s.pointerType !== "mouse" && !a.matches(r.focusableElements)) && t.activeElement.blur();
  const x = v && i.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || x) && !a.isContentEditable && s.preventDefault(), n.freeMode && n.freeMode.enabled && i.freeMode && i.animating && !n.cssMode && i.freeMode.onTouchStart(), i.emit("touchStart", s);
}
function Gt(e) {
  const i = j(), t = this, s = t.touchEventsData, {
    params: r,
    touches: n,
    rtlTranslate: l,
    enabled: o
  } = t;
  if (!o || !r.simulateTouch && e.pointerType === "mouse") return;
  let a = e;
  if (a.originalEvent && (a = a.originalEvent), a.type === "pointermove" && (s.touchId !== null || a.pointerId !== s.pointerId))
    return;
  let f;
  if (a.type === "touchmove") {
    if (f = [...a.changedTouches].find((w) => w.identifier === s.touchId), !f || f.identifier !== s.touchId) return;
  } else
    f = a;
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && t.emit("touchMoveOpposite", a);
    return;
  }
  const g = f.pageX, p = f.pageY;
  if (a.preventedByNestedSwiper) {
    n.startX = g, n.startY = p;
    return;
  }
  if (!t.allowTouchMove) {
    a.target.matches(s.focusableElements) || (t.allowClick = !1), s.isTouched && (Object.assign(n, {
      startX: g,
      startY: p,
      currentX: g,
      currentY: p
    }), s.touchStartTime = K());
    return;
  }
  if (r.touchReleaseOnEdges && !r.loop)
    if (t.isVertical()) {
      if (p < n.startY && t.translate <= t.maxTranslate() || p > n.startY && t.translate >= t.minTranslate()) {
        s.isTouched = !1, s.isMoved = !1;
        return;
      }
    } else {
      if (l && (g > n.startX && -t.translate <= t.maxTranslate() || g < n.startX && -t.translate >= t.minTranslate()))
        return;
      if (!l && (g < n.startX && t.translate <= t.maxTranslate() || g > n.startX && t.translate >= t.minTranslate()))
        return;
    }
  if (i.activeElement && i.activeElement.matches(s.focusableElements) && i.activeElement !== a.target && a.pointerType !== "mouse" && i.activeElement.blur(), i.activeElement && a.target === i.activeElement && a.target.matches(s.focusableElements)) {
    s.isMoved = !0, t.allowClick = !1;
    return;
  }
  s.allowTouchCallbacks && t.emit("touchMove", a), n.previousX = n.currentX, n.previousY = n.currentY, n.currentX = g, n.currentY = p;
  const b = n.currentX - n.startX, c = n.currentY - n.startY;
  if (t.params.threshold && Math.sqrt(b ** 2 + c ** 2) < t.params.threshold) return;
  if (typeof s.isScrolling > "u") {
    let w;
    t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? s.isScrolling = !1 : b * b + c * c >= 25 && (w = Math.atan2(Math.abs(c), Math.abs(b)) * 180 / Math.PI, s.isScrolling = t.isHorizontal() ? w > r.touchAngle : 90 - w > r.touchAngle);
  }
  if (s.isScrolling && t.emit("touchMoveOpposite", a), typeof s.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (s.startMoving = !0), s.isScrolling || a.type === "touchmove" && s.preventTouchMoveFromPointerMove) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving)
    return;
  t.allowClick = !1, !r.cssMode && a.cancelable && a.preventDefault(), r.touchMoveStopPropagation && !r.nested && a.stopPropagation();
  let h = t.isHorizontal() ? b : c, v = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  r.oneWayMovement && (h = Math.abs(h) * (l ? 1 : -1), v = Math.abs(v) * (l ? 1 : -1)), n.diff = h, h *= r.touchRatio, l && (h = -h, v = -v);
  const x = t.touchesDirection;
  t.swipeDirection = h > 0 ? "prev" : "next", t.touchesDirection = v > 0 ? "prev" : "next";
  const d = t.params.loop && !r.cssMode, u = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
  if (!s.isMoved) {
    if (d && u && t.loopFix({
      direction: t.swipeDirection
    }), s.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
      const w = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0
        }
      });
      t.wrapperEl.dispatchEvent(w);
    }
    s.allowMomentumBounce = !1, r.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", a);
  }
  if ((/* @__PURE__ */ new Date()).getTime(), r._loopSwapReset !== !1 && s.isMoved && s.allowThresholdMove && x !== t.touchesDirection && d && u && Math.abs(h) >= 1) {
    Object.assign(n, {
      startX: g,
      startY: p,
      currentX: g,
      currentY: p,
      startTranslate: s.currentTranslate
    }), s.loopSwapReset = !0, s.startTranslate = s.currentTranslate;
    return;
  }
  t.emit("sliderMove", a), s.isMoved = !0, s.currentTranslate = h + s.startTranslate;
  let m = !0, S = r.resistanceRatio;
  if (r.touchReleaseOnEdges && (S = 0), h > 0 ? (d && u && s.allowThresholdMove && s.currentTranslate > (r.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (r.slidesPerView !== "auto" && t.slides.length - r.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), s.currentTranslate > t.minTranslate() && (m = !1, r.resistance && (s.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + s.startTranslate + h) ** S))) : h < 0 && (d && u && s.allowThresholdMove && s.currentTranslate < (r.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (r.slidesPerView !== "auto" && t.slides.length - r.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: t.slides.length - (r.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
  }), s.currentTranslate < t.maxTranslate() && (m = !1, r.resistance && (s.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - s.startTranslate - h) ** S))), m && (a.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && t.swipeDirection === "prev" && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && !t.allowSlideNext && (s.currentTranslate = s.startTranslate), r.threshold > 0)
    if (Math.abs(h) > r.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        s.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, s.currentTranslate = s.startTranslate, n.diff = t.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !r.followFinger || r.cssMode || ((r.freeMode && r.freeMode.enabled && t.freeMode || r.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), r.freeMode && r.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(s.currentTranslate), t.setTranslate(s.currentTranslate));
}
function _t(e) {
  const i = this, t = i.touchEventsData;
  let s = e;
  s.originalEvent && (s = s.originalEvent);
  let r;
  if (s.type === "touchend" || s.type === "touchcancel") {
    if (r = [...s.changedTouches].find((w) => w.identifier === t.touchId), !r || r.identifier !== t.touchId) return;
  } else {
    if (t.touchId !== null || s.pointerId !== t.pointerId) return;
    r = s;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(s.type) && !(["pointercancel", "contextmenu"].includes(s.type) && (i.browser.isSafari || i.browser.isWebView)))
    return;
  t.pointerId = null, t.touchId = null;
  const {
    params: l,
    touches: o,
    rtlTranslate: a,
    slidesGrid: f,
    enabled: g
  } = i;
  if (!g || !l.simulateTouch && s.pointerType === "mouse") return;
  if (t.allowTouchCallbacks && i.emit("touchEnd", s), t.allowTouchCallbacks = !1, !t.isTouched) {
    t.isMoved && l.grabCursor && i.setGrabCursor(!1), t.isMoved = !1, t.startMoving = !1;
    return;
  }
  l.grabCursor && t.isMoved && t.isTouched && (i.allowSlideNext === !0 || i.allowSlidePrev === !0) && i.setGrabCursor(!1);
  const p = K(), b = p - t.touchStartTime;
  if (i.allowClick) {
    const w = s.path || s.composedPath && s.composedPath();
    i.updateClickedSlide(w && w[0] || s.target, w), i.emit("tap click", s), b < 300 && p - t.lastClickTime < 300 && i.emit("doubleTap doubleClick", s);
  }
  if (t.lastClickTime = K(), ye(() => {
    i.destroyed || (i.allowClick = !0);
  }), !t.isTouched || !t.isMoved || !i.swipeDirection || o.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
    t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
    return;
  }
  t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
  let c;
  if (l.followFinger ? c = a ? i.translate : -i.translate : c = -t.currentTranslate, l.cssMode)
    return;
  if (l.freeMode && l.freeMode.enabled) {
    i.freeMode.onTouchEnd({
      currentPos: c
    });
    return;
  }
  const h = c >= -i.maxTranslate() && !i.params.loop;
  let v = 0, x = i.slidesSizesGrid[0];
  for (let w = 0; w < f.length; w += w < l.slidesPerGroupSkip ? 1 : l.slidesPerGroup) {
    const P = w < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
    typeof f[w + P] < "u" ? (h || c >= f[w] && c < f[w + P]) && (v = w, x = f[w + P] - f[w]) : (h || c >= f[w]) && (v = w, x = f[f.length - 1] - f[f.length - 2]);
  }
  let d = null, u = null;
  l.rewind && (i.isBeginning ? u = l.virtual && l.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1 : i.isEnd && (d = 0));
  const m = (c - f[v]) / x, S = v < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
  if (b > l.longSwipesMs) {
    if (!l.longSwipes) {
      i.slideTo(i.activeIndex);
      return;
    }
    i.swipeDirection === "next" && (m >= l.longSwipesRatio ? i.slideTo(l.rewind && i.isEnd ? d : v + S) : i.slideTo(v)), i.swipeDirection === "prev" && (m > 1 - l.longSwipesRatio ? i.slideTo(v + S) : u !== null && m < 0 && Math.abs(m) > l.longSwipesRatio ? i.slideTo(u) : i.slideTo(v));
  } else {
    if (!l.shortSwipes) {
      i.slideTo(i.activeIndex);
      return;
    }
    i.navigation && (s.target === i.navigation.nextEl || s.target === i.navigation.prevEl) ? s.target === i.navigation.nextEl ? i.slideTo(v + S) : i.slideTo(v) : (i.swipeDirection === "next" && i.slideTo(d !== null ? d : v + S), i.swipeDirection === "prev" && i.slideTo(u !== null ? u : v));
  }
}
function he() {
  const e = this, {
    params: i,
    el: t
  } = e;
  if (t && t.offsetWidth === 0) return;
  i.breakpoints && e.setBreakpoint();
  const {
    allowSlideNext: s,
    allowSlidePrev: r,
    snapGrid: n
  } = e, l = e.virtual && e.params.virtual.enabled;
  e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
  const o = l && i.loop;
  if ((i.slidesPerView === "auto" || i.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !o) {
    const a = l ? e.virtual.slides : e.slides;
    e.slideTo(a.length - 1, 0, !1, !0);
  } else
    e.params.loop && !l ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
  e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout(() => {
    e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
  }, 500)), e.allowSlidePrev = r, e.allowSlideNext = s, e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
}
function Dt(e) {
  const i = this;
  i.enabled && (i.allowClick || (i.params.preventClicks && e.preventDefault(), i.params.preventClicksPropagation && i.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function Bt() {
  const e = this, {
    wrapperEl: i,
    rtlTranslate: t,
    enabled: s
  } = e;
  if (!s) return;
  e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -i.scrollLeft : e.translate = -i.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
  let r;
  const n = e.maxTranslate() - e.minTranslate();
  n === 0 ? r = 0 : r = (e.translate - e.minTranslate()) / n, r !== e.progress && e.updateProgress(t ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
function $t(e) {
  const i = this;
  U(i, e.target), !(i.params.cssMode || i.params.slidesPerView !== "auto" && !i.params.autoHeight) && i.update();
}
function Vt() {
  const e = this;
  e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
const Pe = (e, i) => {
  const t = j(), {
    params: s,
    el: r,
    wrapperEl: n,
    device: l
  } = e, o = !!s.nested, a = i === "on" ? "addEventListener" : "removeEventListener", f = i;
  !r || typeof r == "string" || (t[a]("touchstart", e.onDocumentTouchStart, {
    passive: !1,
    capture: o
  }), r[a]("touchstart", e.onTouchStart, {
    passive: !1
  }), r[a]("pointerdown", e.onTouchStart, {
    passive: !1
  }), t[a]("touchmove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), t[a]("pointermove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), t[a]("touchend", e.onTouchEnd, {
    passive: !0
  }), t[a]("pointerup", e.onTouchEnd, {
    passive: !0
  }), t[a]("pointercancel", e.onTouchEnd, {
    passive: !0
  }), t[a]("touchcancel", e.onTouchEnd, {
    passive: !0
  }), t[a]("pointerout", e.onTouchEnd, {
    passive: !0
  }), t[a]("pointerleave", e.onTouchEnd, {
    passive: !0
  }), t[a]("contextmenu", e.onTouchEnd, {
    passive: !0
  }), (s.preventClicks || s.preventClicksPropagation) && r[a]("click", e.onClick, !0), s.cssMode && n[a]("scroll", e.onScroll), s.updateOnWindowResize ? e[f](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", he, !0) : e[f]("observerUpdate", he, !0), r[a]("load", e.onLoad, {
    capture: !0
  }));
};
function Ft() {
  const e = this, {
    params: i
  } = e;
  e.onTouchStart = At.bind(e), e.onTouchMove = Gt.bind(e), e.onTouchEnd = _t.bind(e), e.onDocumentTouchStart = Vt.bind(e), i.cssMode && (e.onScroll = Bt.bind(e)), e.onClick = Dt.bind(e), e.onLoad = $t.bind(e), Pe(e, "on");
}
function Nt() {
  Pe(this, "off");
}
var Ht = {
  attachEvents: Ft,
  detachEvents: Nt
};
const ge = (e, i) => e.grid && i.grid && i.grid.rows > 1;
function Rt() {
  const e = this, {
    realIndex: i,
    initialized: t,
    params: s,
    el: r
  } = e, n = s.breakpoints;
  if (!n || n && Object.keys(n).length === 0) return;
  const l = j(), o = s.breakpointsBase === "window" || !s.breakpointsBase ? s.breakpointsBase : "container", a = ["window", "container"].includes(s.breakpointsBase) || !s.breakpointsBase ? e.el : l.querySelector(s.breakpointsBase), f = e.getBreakpoint(n, o, a);
  if (!f || e.currentBreakpoint === f) return;
  const p = (f in n ? n[f] : void 0) || e.originalParams, b = ge(e, s), c = ge(e, p), h = e.params.grabCursor, v = p.grabCursor, x = s.enabled;
  b && !c ? (r.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`), e.emitContainerClasses()) : !b && c && (r.classList.add(`${s.containerModifierClass}grid`), (p.grid.fill && p.grid.fill === "column" || !p.grid.fill && s.grid.fill === "column") && r.classList.add(`${s.containerModifierClass}grid-column`), e.emitContainerClasses()), h && !v ? e.unsetGrabCursor() : !h && v && e.setGrabCursor(), ["navigation", "pagination", "scrollbar"].forEach((P) => {
    if (typeof p[P] > "u") return;
    const M = s[P] && s[P].enabled, y = p[P] && p[P].enabled;
    M && !y && e[P].disable(), !M && y && e[P].enable();
  });
  const d = p.direction && p.direction !== s.direction, u = s.loop && (p.slidesPerView !== s.slidesPerView || d), m = s.loop;
  d && t && e.changeDirection(), B(e.params, p);
  const S = e.params.enabled, w = e.params.loop;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }), x && !S ? e.disable() : !x && S && e.enable(), e.currentBreakpoint = f, e.emit("_beforeBreakpoint", p), t && (u ? (e.loopDestroy(), e.loopCreate(i), e.updateSlides()) : !m && w ? (e.loopCreate(i), e.updateSlides()) : m && !w && e.loopDestroy()), e.emit("breakpoint", p);
}
function jt(e, i = "window", t) {
  if (!e || i === "container" && !t) return;
  let s = !1;
  const r = _(), n = i === "window" ? r.innerHeight : t.clientHeight, l = Object.keys(e).map((o) => {
    if (typeof o == "string" && o.indexOf("@") === 0) {
      const a = parseFloat(o.substr(1));
      return {
        value: n * a,
        point: o
      };
    }
    return {
      value: o,
      point: o
    };
  });
  l.sort((o, a) => parseInt(o.value, 10) - parseInt(a.value, 10));
  for (let o = 0; o < l.length; o += 1) {
    const {
      point: a,
      value: f
    } = l[o];
    i === "window" ? r.matchMedia(`(min-width: ${f}px)`).matches && (s = a) : f <= t.clientWidth && (s = a);
  }
  return s || "max";
}
var qt = {
  setBreakpoint: Rt,
  getBreakpoint: jt
};
function Wt(e, i) {
  const t = [];
  return e.forEach((s) => {
    typeof s == "object" ? Object.keys(s).forEach((r) => {
      s[r] && t.push(i + r);
    }) : typeof s == "string" && t.push(i + s);
  }), t;
}
function Yt() {
  const e = this, {
    classNames: i,
    params: t,
    rtl: s,
    el: r,
    device: n
  } = e, l = Wt(["initialized", t.direction, {
    "free-mode": e.params.freeMode && t.freeMode.enabled
  }, {
    autoheight: t.autoHeight
  }, {
    rtl: s
  }, {
    grid: t.grid && t.grid.rows > 1
  }, {
    "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column"
  }, {
    android: n.android
  }, {
    ios: n.ios
  }, {
    "css-mode": t.cssMode
  }, {
    centered: t.cssMode && t.centeredSlides
  }, {
    "watch-progress": t.watchSlidesProgress
  }], t.containerModifierClass);
  i.push(...l), r.classList.add(...i), e.emitContainerClasses();
}
function Xt() {
  const e = this, {
    el: i,
    classNames: t
  } = e;
  !i || typeof i == "string" || (i.classList.remove(...t), e.emitContainerClasses());
}
var Ut = {
  addClasses: Yt,
  removeClasses: Xt
};
function Kt() {
  const e = this, {
    isLocked: i,
    params: t
  } = e, {
    slidesOffsetBefore: s
  } = t;
  if (s) {
    const r = e.slides.length - 1, n = e.slidesGrid[r] + e.slidesSizesGrid[r] + s * 2;
    e.isLocked = e.size > n;
  } else
    e.isLocked = e.snapGrid.length === 1;
  t.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), t.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), i && i !== e.isLocked && (e.isEnd = !1), i !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var Qt = {
  checkOverflow: Kt
}, ve = {
  init: !0,
  direction: "horizontal",
  oneWayMovement: !1,
  swiperElementNodeName: "SWIPER-CONTAINER",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  eventsPrefix: "swiper",
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: !1,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: !1,
  // Set wrapper width
  setWrapperSize: !1,
  // Virtual Translate
  virtualTranslate: !1,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  snapToSlideEdge: !1,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: !0,
  // Round length
  roundLengths: !1,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 5,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  // Unique Navigation Elements
  uniqueNavElements: !0,
  // Resistance
  resistance: !0,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: !1,
  // Cursor
  grabCursor: !1,
  // Clicks
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  // loop
  loop: !1,
  loopAddBlankSlides: !0,
  loopAdditionalSlides: 0,
  loopPreventsSliding: !0,
  // rewind
  rewind: !1,
  // Swiping/no swiping
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: !0,
  // Internals
  _emitClasses: !1
};
function Zt(e, i) {
  return function(s = {}) {
    const r = Object.keys(s)[0], n = s[r];
    if (typeof n != "object" || n === null) {
      B(i, s);
      return;
    }
    if (e[r] === !0 && (e[r] = {
      enabled: !0
    }), r === "navigation" && e[r] && e[r].enabled && !e[r].prevEl && !e[r].nextEl && (e[r].auto = !0), ["pagination", "scrollbar"].indexOf(r) >= 0 && e[r] && e[r].enabled && !e[r].el && (e[r].auto = !0), !(r in e && "enabled" in n)) {
      B(i, s);
      return;
    }
    typeof e[r] == "object" && !("enabled" in e[r]) && (e[r].enabled = !0), e[r] || (e[r] = {
      enabled: !1
    }), B(i, s);
  };
}
const ae = {
  eventsEmitter: Ue,
  update: at,
  translate: ut,
  transition: gt,
  slide: Et,
  loop: Lt,
  grabCursor: Ot,
  events: Ht,
  breakpoints: qt,
  checkOverflow: Qt,
  classes: Ut
}, le = {};
class $ {
  constructor(...i) {
    let t, s;
    i.length === 1 && i[0].constructor && Object.prototype.toString.call(i[0]).slice(8, -1) === "Object" ? s = i[0] : [t, s] = i, s || (s = {}), s = B({}, s), t && !s.el && (s.el = t);
    const r = j();
    if (s.el && typeof s.el == "string" && r.querySelectorAll(s.el).length > 1) {
      const a = [];
      return r.querySelectorAll(s.el).forEach((f) => {
        const g = B({}, s, {
          el: f
        });
        a.push(new $(g));
      }), a;
    }
    const n = this;
    n.__swiper__ = !0, n.support = Te(), n.device = Ee({
      userAgent: s.userAgent
    }), n.browser = Ce(), n.eventsListeners = {}, n.eventsAnyListeners = [], n.modules = [...n.__modules__], s.modules && Array.isArray(s.modules) && s.modules.forEach((a) => {
      typeof a == "function" && n.modules.indexOf(a) < 0 && n.modules.push(a);
    });
    const l = {};
    n.modules.forEach((a) => {
      a({
        params: s,
        swiper: n,
        extendParams: Zt(s, l),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n)
      });
    });
    const o = B({}, ve, l);
    return n.params = B({}, o, le, s), n.originalParams = B({}, n.params), n.passedParams = B({}, s), n.params && n.params.on && Object.keys(n.params.on).forEach((a) => {
      n.on(a, n.params.on[a]);
    }), n.params && n.params.onAny && n.onAny(n.params.onAny), Object.assign(n, {
      enabled: n.params.enabled,
      el: t,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return n.params.direction === "horizontal";
      },
      isVertical() {
        return n.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: !0,
      isEnd: !1,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: n.params.allowSlideNext,
      allowSlidePrev: n.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: n.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: !0,
      // Touches
      allowTouchMove: n.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    }), n.emit("_swiper"), n.params.init && n.init(), n;
  }
  getDirectionLabel(i) {
    return this.isHorizontal() ? i : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[i];
  }
  getSlideIndex(i) {
    const {
      slidesEl: t,
      params: s
    } = this, r = V(t, `.${s.slideClass}, swiper-slide`), n = J(r[0]);
    return J(i) - n;
  }
  getSlideIndexByData(i) {
    return this.getSlideIndex(this.slides.find((t) => t.getAttribute("data-swiper-slide-index") * 1 === i));
  }
  getSlideIndexWhenGrid(i) {
    return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? i = Math.floor(i / this.params.grid.rows) : this.params.grid.fill === "row" && (i = i % Math.ceil(this.slides.length / this.params.grid.rows))), i;
  }
  recalcSlides() {
    const i = this, {
      slidesEl: t,
      params: s
    } = i;
    i.slides = V(t, `.${s.slideClass}, swiper-slide`);
  }
  enable() {
    const i = this;
    i.enabled || (i.enabled = !0, i.params.grabCursor && i.setGrabCursor(), i.emit("enable"));
  }
  disable() {
    const i = this;
    i.enabled && (i.enabled = !1, i.params.grabCursor && i.unsetGrabCursor(), i.emit("disable"));
  }
  setProgress(i, t) {
    const s = this;
    i = Math.min(Math.max(i, 0), 1);
    const r = s.minTranslate(), l = (s.maxTranslate() - r) * i + r;
    s.translateTo(l, typeof t > "u" ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const i = this;
    if (!i.params._emitClasses || !i.el) return;
    const t = i.el.className.split(" ").filter((s) => s.indexOf("swiper") === 0 || s.indexOf(i.params.containerModifierClass) === 0);
    i.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(i) {
    const t = this;
    return t.destroyed ? "" : i.className.split(" ").filter((s) => s.indexOf("swiper-slide") === 0 || s.indexOf(t.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const i = this;
    if (!i.params._emitClasses || !i.el) return;
    const t = [];
    i.slides.forEach((s) => {
      const r = i.getSlideClasses(s);
      t.push({
        slideEl: s,
        classNames: r
      }), i.emit("_slideClass", s, r);
    }), i.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(i = "current", t = !1) {
    const s = this, {
      params: r,
      slides: n,
      slidesGrid: l,
      slidesSizesGrid: o,
      size: a,
      activeIndex: f
    } = s;
    let g = 1;
    if (typeof r.slidesPerView == "number") return r.slidesPerView;
    if (r.centeredSlides) {
      let p = n[f] ? Math.ceil(n[f].swiperSlideSize) : 0, b;
      for (let c = f + 1; c < n.length; c += 1)
        n[c] && !b && (p += Math.ceil(n[c].swiperSlideSize), g += 1, p > a && (b = !0));
      for (let c = f - 1; c >= 0; c -= 1)
        n[c] && !b && (p += n[c].swiperSlideSize, g += 1, p > a && (b = !0));
    } else if (i === "current")
      for (let p = f + 1; p < n.length; p += 1)
        (t ? l[p] + o[p] - l[f] < a : l[p] - l[f] < a) && (g += 1);
    else
      for (let p = f - 1; p >= 0; p -= 1)
        l[f] - l[p] < a && (g += 1);
    return g;
  }
  update() {
    const i = this;
    if (!i || i.destroyed) return;
    const {
      snapGrid: t,
      params: s
    } = i;
    s.breakpoints && i.setBreakpoint(), [...i.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
      l.complete && U(i, l);
    }), i.updateSize(), i.updateSlides(), i.updateProgress(), i.updateSlidesClasses();
    function r() {
      const l = i.rtlTranslate ? i.translate * -1 : i.translate, o = Math.min(Math.max(l, i.maxTranslate()), i.minTranslate());
      i.setTranslate(o), i.updateActiveIndex(), i.updateSlidesClasses();
    }
    let n;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      r(), s.autoHeight && i.updateAutoHeight();
    else {
      if ((s.slidesPerView === "auto" || s.slidesPerView > 1) && i.isEnd && !s.centeredSlides) {
        const l = i.virtual && s.virtual.enabled ? i.virtual.slides : i.slides;
        n = i.slideTo(l.length - 1, 0, !1, !0);
      } else
        n = i.slideTo(i.activeIndex, 0, !1, !0);
      n || r();
    }
    s.watchOverflow && t !== i.snapGrid && i.checkOverflow(), i.emit("update");
  }
  changeDirection(i, t = !0) {
    const s = this, r = s.params.direction;
    return i || (i = r === "horizontal" ? "vertical" : "horizontal"), i === r || i !== "horizontal" && i !== "vertical" || (s.el.classList.remove(`${s.params.containerModifierClass}${r}`), s.el.classList.add(`${s.params.containerModifierClass}${i}`), s.emitContainerClasses(), s.params.direction = i, s.slides.forEach((n) => {
      i === "vertical" ? n.style.width = "" : n.style.height = "";
    }), s.emit("changeDirection"), t && s.update()), s;
  }
  changeLanguageDirection(i) {
    const t = this;
    t.rtl && i === "rtl" || !t.rtl && i === "ltr" || (t.rtl = i === "rtl", t.rtlTranslate = t.params.direction === "horizontal" && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update());
  }
  mount(i) {
    const t = this;
    if (t.mounted) return !0;
    let s = i || t.params.el;
    if (typeof s == "string" && (s = document.querySelector(s)), !s)
      return !1;
    s.swiper = t, s.parentNode && s.parentNode.host && s.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
    const r = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let l = s && s.shadowRoot && s.shadowRoot.querySelector ? s.shadowRoot.querySelector(r()) : V(s, r())[0];
    return !l && t.params.createElements && (l = Z("div", t.params.wrapperClass), s.append(l), V(s, `.${t.params.slideClass}`).forEach((o) => {
      l.append(o);
    })), Object.assign(t, {
      el: s,
      wrapperEl: l,
      slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : l,
      hostEl: t.isElement ? s.parentNode.host : s,
      mounted: !0,
      // RTL
      rtl: s.dir.toLowerCase() === "rtl" || H(s, "direction") === "rtl",
      rtlTranslate: t.params.direction === "horizontal" && (s.dir.toLowerCase() === "rtl" || H(s, "direction") === "rtl"),
      wrongRTL: H(l, "display") === "-webkit-box"
    }), !0;
  }
  init(i) {
    const t = this;
    if (t.initialized || t.mount(i) === !1) return t;
    t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(void 0, !0), t.attachEvents();
    const r = [...t.el.querySelectorAll('[loading="lazy"]')];
    return t.isElement && r.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), r.forEach((n) => {
      n.complete ? U(t, n) : n.addEventListener("load", (l) => {
        U(t, l.target);
      });
    }), ce(t), t.initialized = !0, ce(t), t.emit("init"), t.emit("afterInit"), t;
  }
  destroy(i = !0, t = !0) {
    const s = this, {
      params: r,
      el: n,
      wrapperEl: l,
      slides: o
    } = s;
    return typeof s.params > "u" || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), r.loop && s.loopDestroy(), t && (s.removeClasses(), n && typeof n != "string" && n.removeAttribute("style"), l && l.removeAttribute("style"), o && o.length && o.forEach((a) => {
      a.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass), a.removeAttribute("style"), a.removeAttribute("data-swiper-slide-index");
    })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((a) => {
      s.off(a);
    }), i !== !1 && (s.el && typeof s.el != "string" && (s.el.swiper = null), De(s)), s.destroyed = !0), null;
  }
  static extendDefaults(i) {
    B(le, i);
  }
  static get extendedDefaults() {
    return le;
  }
  static get defaults() {
    return ve;
  }
  static installModule(i) {
    $.prototype.__modules__ || ($.prototype.__modules__ = []);
    const t = $.prototype.__modules__;
    typeof i == "function" && t.indexOf(i) < 0 && t.push(i);
  }
  static use(i) {
    return Array.isArray(i) ? (i.forEach((t) => $.installModule(t)), $) : ($.installModule(i), $);
  }
}
Object.keys(ae).forEach((e) => {
  Object.keys(ae[e]).forEach((i) => {
    $.prototype[i] = ae[e][i];
  });
});
$.use([Ye, Xe]);
function Le(e, i, t, s) {
  return e.params.createElements && Object.keys(s).forEach((r) => {
    if (!t[r] && t.auto === !0) {
      let n = V(e.el, `.${s[r]}`)[0];
      n || (n = Z("div", s[r]), n.className = s[r], e.el.append(n)), t[r] = n, i[r] = n;
    }
  }), t;
}
const be = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>';
function Jt({
  swiper: e,
  extendParams: i,
  on: t,
  emit: s
}) {
  i({
    navigation: {
      nextEl: null,
      prevEl: null,
      addIcons: !0,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  }), e.navigation = {
    nextEl: null,
    prevEl: null,
    arrowSvg: be
  };
  function r(c) {
    let h;
    return c && typeof c == "string" && e.isElement && (h = e.el.querySelector(c) || e.hostEl.querySelector(c), h) ? h : (c && (typeof c == "string" && (h = [...document.querySelectorAll(c)]), e.params.uniqueNavElements && typeof c == "string" && h && h.length > 1 && e.el.querySelectorAll(c).length === 1 ? h = e.el.querySelector(c) : h && h.length === 1 && (h = h[0])), c && !h ? c : h);
  }
  function n(c, h) {
    const v = e.params.navigation;
    c = A(c), c.forEach((x) => {
      x && (x.classList[h ? "add" : "remove"](...v.disabledClass.split(" ")), x.tagName === "BUTTON" && (x.disabled = h), e.params.watchOverflow && e.enabled && x.classList[e.isLocked ? "add" : "remove"](v.lockClass));
    });
  }
  function l() {
    const {
      nextEl: c,
      prevEl: h
    } = e.navigation;
    if (e.params.loop) {
      n(h, !1), n(c, !1);
      return;
    }
    n(h, e.isBeginning && !e.params.rewind), n(c, e.isEnd && !e.params.rewind);
  }
  function o(c) {
    c.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), s("navigationPrev"));
  }
  function a(c) {
    c.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), s("navigationNext"));
  }
  function f() {
    const c = e.params.navigation;
    if (e.params.navigation = Le(e, e.originalParams.navigation, e.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }), !(c.nextEl || c.prevEl)) return;
    let h = r(c.nextEl), v = r(c.prevEl);
    Object.assign(e.navigation, {
      nextEl: h,
      prevEl: v
    }), h = A(h), v = A(v);
    const x = (d, u) => {
      if (d) {
        if (c.addIcons && d.matches(".swiper-button-next,.swiper-button-prev") && !d.querySelector("svg")) {
          const m = document.createElement("div");
          de(m, be), d.appendChild(m.querySelector("svg")), m.remove();
        }
        d.addEventListener("click", u === "next" ? a : o);
      }
      !e.enabled && d && d.classList.add(...c.lockClass.split(" "));
    };
    h.forEach((d) => x(d, "next")), v.forEach((d) => x(d, "prev"));
  }
  function g() {
    let {
      nextEl: c,
      prevEl: h
    } = e.navigation;
    c = A(c), h = A(h);
    const v = (x, d) => {
      x.removeEventListener("click", d === "next" ? a : o), x.classList.remove(...e.params.navigation.disabledClass.split(" "));
    };
    c.forEach((x) => v(x, "next")), h.forEach((x) => v(x, "prev"));
  }
  t("init", () => {
    e.params.navigation.enabled === !1 ? b() : (f(), l());
  }), t("toEdge fromEdge lock unlock", () => {
    l();
  }), t("destroy", () => {
    g();
  }), t("enable disable", () => {
    let {
      nextEl: c,
      prevEl: h
    } = e.navigation;
    if (c = A(c), h = A(h), e.enabled) {
      l();
      return;
    }
    [...c, ...h].filter((v) => !!v).forEach((v) => v.classList.add(e.params.navigation.lockClass));
  }), t("click", (c, h) => {
    let {
      nextEl: v,
      prevEl: x
    } = e.navigation;
    v = A(v), x = A(x);
    const d = h.target;
    let u = x.includes(d) || v.includes(d);
    if (e.isElement && !u) {
      const m = h.path || h.composedPath && h.composedPath();
      m && (u = m.find((S) => v.includes(S) || x.includes(S)));
    }
    if (e.params.navigation.hideOnClick && !u) {
      if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === d || e.pagination.el.contains(d))) return;
      let m;
      v.length ? m = v[0].classList.contains(e.params.navigation.hiddenClass) : x.length && (m = x[0].classList.contains(e.params.navigation.hiddenClass)), s(m === !0 ? "navigationShow" : "navigationHide"), [...v, ...x].filter((S) => !!S).forEach((S) => S.classList.toggle(e.params.navigation.hiddenClass));
    }
  });
  const p = () => {
    e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), f(), l();
  }, b = () => {
    e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), g();
  };
  Object.assign(e.navigation, {
    enable: p,
    disable: b,
    update: l,
    init: f,
    destroy: g
  });
}
function W(e = "") {
  return `.${e.trim().replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1").replace(/ /g, ".")}`;
}
function ei({
  swiper: e,
  extendParams: i,
  on: t,
  emit: s
}) {
  const r = "swiper-pagination";
  i({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: (d) => d,
      formatFractionTotal: (d) => d,
      bulletClass: `${r}-bullet`,
      bulletActiveClass: `${r}-bullet-active`,
      modifierClass: `${r}-`,
      currentClass: `${r}-current`,
      totalClass: `${r}-total`,
      hiddenClass: `${r}-hidden`,
      progressbarFillClass: `${r}-progressbar-fill`,
      progressbarOppositeClass: `${r}-progressbar-opposite`,
      clickableClass: `${r}-clickable`,
      lockClass: `${r}-lock`,
      horizontalClass: `${r}-horizontal`,
      verticalClass: `${r}-vertical`,
      paginationDisabledClass: `${r}-disabled`
    }
  }), e.pagination = {
    el: null,
    bullets: []
  };
  let n, l = 0;
  function o() {
    return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0;
  }
  function a(d, u) {
    const {
      bulletActiveClass: m
    } = e.params.pagination;
    d && (d = d[`${u === "prev" ? "previous" : "next"}ElementSibling`], d && (d.classList.add(`${m}-${u}`), d = d[`${u === "prev" ? "previous" : "next"}ElementSibling`], d && d.classList.add(`${m}-${u}-${u}`)));
  }
  function f(d, u, m) {
    if (d = d % m, u = u % m, u === d + 1)
      return "next";
    if (u === d - 1)
      return "previous";
  }
  function g(d) {
    const u = d.target.closest(W(e.params.pagination.bulletClass));
    if (!u)
      return;
    d.preventDefault();
    const m = J(u) * e.params.slidesPerGroup;
    if (e.params.loop) {
      if (e.realIndex === m) return;
      const S = f(e.realIndex, m, e.slides.length);
      S === "next" ? e.slideNext() : S === "previous" ? e.slidePrev() : e.slideToLoop(m);
    } else
      e.slideTo(m);
  }
  function p() {
    const d = e.rtl, u = e.params.pagination;
    if (o()) return;
    let m = e.pagination.el;
    m = A(m);
    let S, w;
    const P = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length, M = e.params.loop ? Math.ceil(P / e.params.slidesPerGroup) : e.snapGrid.length;
    if (e.params.loop ? (w = e.previousRealIndex || 0, S = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : typeof e.snapIndex < "u" ? (S = e.snapIndex, w = e.previousSnapIndex) : (w = e.previousIndex || 0, S = e.activeIndex || 0), u.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
      const y = e.pagination.bullets;
      let O, T, E;
      if (u.dynamicBullets && (n = oe(y[0], e.isHorizontal() ? "width" : "height"), m.forEach((C) => {
        C.style[e.isHorizontal() ? "width" : "height"] = `${n * (u.dynamicMainBullets + 4)}px`;
      }), u.dynamicMainBullets > 1 && w !== void 0 && (l += S - (w || 0), l > u.dynamicMainBullets - 1 ? l = u.dynamicMainBullets - 1 : l < 0 && (l = 0)), O = Math.max(S - l, 0), T = O + (Math.min(y.length, u.dynamicMainBullets) - 1), E = (T + O) / 2), y.forEach((C) => {
        const L = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((k) => `${u.bulletActiveClass}${k}`)].map((k) => typeof k == "string" && k.includes(" ") ? k.split(" ") : k).flat();
        C.classList.remove(...L);
      }), m.length > 1)
        y.forEach((C) => {
          const L = J(C);
          L === S ? C.classList.add(...u.bulletActiveClass.split(" ")) : e.isElement && C.setAttribute("part", "bullet"), u.dynamicBullets && (L >= O && L <= T && C.classList.add(...`${u.bulletActiveClass}-main`.split(" ")), L === O && a(C, "prev"), L === T && a(C, "next"));
        });
      else {
        const C = y[S];
        if (C && C.classList.add(...u.bulletActiveClass.split(" ")), e.isElement && y.forEach((L, k) => {
          L.setAttribute("part", k === S ? "bullet-active" : "bullet");
        }), u.dynamicBullets) {
          const L = y[O], k = y[T];
          for (let z = O; z <= T; z += 1)
            y[z] && y[z].classList.add(...`${u.bulletActiveClass}-main`.split(" "));
          a(L, "prev"), a(k, "next");
        }
      }
      if (u.dynamicBullets) {
        const C = Math.min(y.length, u.dynamicMainBullets + 4), L = (n * C - n) / 2 - E * n, k = d ? "right" : "left";
        y.forEach((z) => {
          z.style[e.isHorizontal() ? k : "top"] = `${L}px`;
        });
      }
    }
    m.forEach((y, O) => {
      if (u.type === "fraction" && (y.querySelectorAll(W(u.currentClass)).forEach((T) => {
        T.textContent = u.formatFractionCurrent(S + 1);
      }), y.querySelectorAll(W(u.totalClass)).forEach((T) => {
        T.textContent = u.formatFractionTotal(M);
      })), u.type === "progressbar") {
        let T;
        u.progressbarOpposite ? T = e.isHorizontal() ? "vertical" : "horizontal" : T = e.isHorizontal() ? "horizontal" : "vertical";
        const E = (S + 1) / M;
        let C = 1, L = 1;
        T === "horizontal" ? C = E : L = E, y.querySelectorAll(W(u.progressbarFillClass)).forEach((k) => {
          k.style.transform = `translate3d(0,0,0) scaleX(${C}) scaleY(${L})`, k.style.transitionDuration = `${e.params.speed}ms`;
        });
      }
      u.type === "custom" && u.renderCustom ? (de(y, u.renderCustom(e, S + 1, M)), O === 0 && s("paginationRender", y)) : (O === 0 && s("paginationRender", y), s("paginationUpdate", y)), e.params.watchOverflow && e.enabled && y.classList[e.isLocked ? "add" : "remove"](u.lockClass);
    });
  }
  function b() {
    const d = e.params.pagination;
    if (o()) return;
    const u = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.grid && e.params.grid.rows > 1 ? e.slides.length / Math.ceil(e.params.grid.rows) : e.slides.length;
    let m = e.pagination.el;
    m = A(m);
    let S = "";
    if (d.type === "bullets") {
      let w = e.params.loop ? Math.ceil(u / e.params.slidesPerGroup) : e.snapGrid.length;
      e.params.freeMode && e.params.freeMode.enabled && w > u && (w = u);
      for (let P = 0; P < w; P += 1)
        d.renderBullet ? S += d.renderBullet.call(e, P, d.bulletClass) : S += `<${d.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${d.bulletClass}"></${d.bulletElement}>`;
    }
    d.type === "fraction" && (d.renderFraction ? S = d.renderFraction.call(e, d.currentClass, d.totalClass) : S = `<span class="${d.currentClass}"></span> / <span class="${d.totalClass}"></span>`), d.type === "progressbar" && (d.renderProgressbar ? S = d.renderProgressbar.call(e, d.progressbarFillClass) : S = `<span class="${d.progressbarFillClass}"></span>`), e.pagination.bullets = [], m.forEach((w) => {
      d.type !== "custom" && de(w, S || ""), d.type === "bullets" && e.pagination.bullets.push(...w.querySelectorAll(W(d.bulletClass)));
    }), d.type !== "custom" && s("paginationRender", m[0]);
  }
  function c() {
    e.params.pagination = Le(e, e.originalParams.pagination, e.params.pagination, {
      el: "swiper-pagination"
    });
    const d = e.params.pagination;
    if (!d.el) return;
    let u;
    typeof d.el == "string" && e.isElement && (u = e.el.querySelector(d.el)), !u && typeof d.el == "string" && (u = [...document.querySelectorAll(d.el)]), u || (u = d.el), !(!u || u.length === 0) && (e.params.uniqueNavElements && typeof d.el == "string" && Array.isArray(u) && u.length > 1 && (u = [...e.el.querySelectorAll(d.el)], u.length > 1 && (u = u.find((m) => xe(m, ".swiper")[0] === e.el))), Array.isArray(u) && u.length === 1 && (u = u[0]), Object.assign(e.pagination, {
      el: u
    }), u = A(u), u.forEach((m) => {
      d.type === "bullets" && d.clickable && m.classList.add(...(d.clickableClass || "").split(" ")), m.classList.add(d.modifierClass + d.type), m.classList.add(e.isHorizontal() ? d.horizontalClass : d.verticalClass), d.type === "bullets" && d.dynamicBullets && (m.classList.add(`${d.modifierClass}${d.type}-dynamic`), l = 0, d.dynamicMainBullets < 1 && (d.dynamicMainBullets = 1)), d.type === "progressbar" && d.progressbarOpposite && m.classList.add(d.progressbarOppositeClass), d.clickable && m.addEventListener("click", g), e.enabled || m.classList.add(d.lockClass);
    }));
  }
  function h() {
    const d = e.params.pagination;
    if (o()) return;
    let u = e.pagination.el;
    u && (u = A(u), u.forEach((m) => {
      m.classList.remove(d.hiddenClass), m.classList.remove(d.modifierClass + d.type), m.classList.remove(e.isHorizontal() ? d.horizontalClass : d.verticalClass), d.clickable && (m.classList.remove(...(d.clickableClass || "").split(" ")), m.removeEventListener("click", g));
    })), e.pagination.bullets && e.pagination.bullets.forEach((m) => m.classList.remove(...d.bulletActiveClass.split(" ")));
  }
  t("changeDirection", () => {
    if (!e.pagination || !e.pagination.el) return;
    const d = e.params.pagination;
    let {
      el: u
    } = e.pagination;
    u = A(u), u.forEach((m) => {
      m.classList.remove(d.horizontalClass, d.verticalClass), m.classList.add(e.isHorizontal() ? d.horizontalClass : d.verticalClass);
    });
  }), t("init", () => {
    e.params.pagination.enabled === !1 ? x() : (c(), b(), p());
  }), t("activeIndexChange", () => {
    typeof e.snapIndex > "u" && p();
  }), t("snapIndexChange", () => {
    p();
  }), t("snapGridLengthChange", () => {
    b(), p();
  }), t("destroy", () => {
    h();
  }), t("enable disable", () => {
    let {
      el: d
    } = e.pagination;
    d && (d = A(d), d.forEach((u) => u.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)));
  }), t("lock unlock", () => {
    p();
  }), t("click", (d, u) => {
    const m = u.target, S = A(e.pagination.el);
    if (e.params.pagination.el && e.params.pagination.hideOnClick && S && S.length > 0 && !m.classList.contains(e.params.pagination.bulletClass)) {
      if (e.navigation && (e.navigation.nextEl && m === e.navigation.nextEl || e.navigation.prevEl && m === e.navigation.prevEl)) return;
      const w = S[0].classList.contains(e.params.pagination.hiddenClass);
      s(w === !0 ? "paginationShow" : "paginationHide"), S.forEach((P) => P.classList.toggle(e.params.pagination.hiddenClass));
    }
  });
  const v = () => {
    e.el.classList.remove(e.params.pagination.paginationDisabledClass);
    let {
      el: d
    } = e.pagination;
    d && (d = A(d), d.forEach((u) => u.classList.remove(e.params.pagination.paginationDisabledClass))), c(), b(), p();
  }, x = () => {
    e.el.classList.add(e.params.pagination.paginationDisabledClass);
    let {
      el: d
    } = e.pagination;
    d && (d = A(d), d.forEach((u) => u.classList.add(e.params.pagination.paginationDisabledClass))), h();
  };
  Object.assign(e.pagination, {
    enable: v,
    disable: x,
    render: b,
    update: p,
    init: c,
    destroy: h
  });
}
var ti = Object.defineProperty, Ie = (e, i, t, s) => {
  for (var r = void 0, n = e.length - 1, l; n >= 0; n--)
    (l = e[n]) && (r = l(i, t, r) || r);
  return r && ti(i, t, r), r;
};
class ee extends Oe {
  constructor() {
    super(...arguments), this.sliderId = Math.floor(Math.random() * 2092) + 21, this.swiperInstance = null;
  }
  createRenderRoot() {
    return this;
  }
  get cfg() {
    var t, s, r, n, l, o, a;
    const i = (f, g) => Number(typeof f == "object" && f !== null ? f.value ?? g : f ?? g);
    return {
      section_title: ((t = this.config) == null ? void 0 : t.section_title) ?? "Explore Our Global Network",
      section_description: ((s = this.config) == null ? void 0 : s.section_description) ?? "Discover specialized hubs, regional ecosystems, and open-source documentation.",
      background: ((r = this.config) == null ? void 0 : r.background) ?? "rgba(22,22,26,0.99)",
      slides_per_view_mobile: i((n = this.config) == null ? void 0 : n.slides_per_view_mobile, 1),
      slides_per_view_tablet: i((l = this.config) == null ? void 0 : l.slides_per_view_tablet, 2),
      slides_per_view_desktop: i((o = this.config) == null ? void 0 : o.slides_per_view_desktop, 4),
      items: ((a = this.config) == null ? void 0 : a.items) ?? [
        { title: "Developer Portal", link: "/developers", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" },
        { title: "Community Ecosystem", link: "/community", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" },
        { title: "Design Systems", link: "/design", image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80" },
        { title: "Research & Labs", link: "/labs", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80" },
        { title: "Cloud Architecture", link: "/cloud", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" },
        { title: "Global Events", link: "/events", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" }
      ]
    };
  }
  firstUpdated() {
    this.initSwiper();
  }
  updated(i) {
    i.has("component") && setTimeout(() => this.initSwiper(), 0);
  }
  disconnectedCallback() {
    var i;
    super.disconnectedCallback(), (i = this.swiperInstance) == null || i.destroy(!0, !0);
  }
  initSwiper() {
    var s;
    const i = this.renderRoot.querySelector(`.main-links-style-1-${this.sliderId}`);
    if (!i) return;
    (s = this.swiperInstance) == null || s.destroy(!0, !0);
    const t = this.cfg;
    this.swiperInstance = new $(i, {
      modules: [Jt, ei],
      slidesPerView: t.slides_per_view_mobile,
      spaceBetween: 20,
      breakpoints: {
        768: { slidesPerView: t.slides_per_view_tablet },
        1024: { slidesPerView: t.slides_per_view_desktop }
      },
      navigation: { nextEl: `.next-${this.sliderId}`, prevEl: `.prev-${this.sliderId}` },
      pagination: { el: `.pagination-${this.sliderId}`, clickable: !0 }
    });
  }
  renderSectionHeader() {
    const { section_title: i, section_description: t } = this.cfg;
    return Y`
      <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:1rem;margin-bottom:2.5rem;" data-sal="slide-up" data-sal-duration="700">
        <h2 style="margin:0;font-size:2rem;font-weight:600;letter-spacing:-0.025em;color:#ffffff;line-height:1.2;">${i}</h2>
        <p style="margin:0;font-size:1rem;color:rgba(255,255,255,0.7);font-weight:400;line-height:1.7;max-width:42rem;">${t}</p>
      </div>
    `;
  }
  renderNavButtons() {
    return Y`
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
  renderLinkCard(i, t) {
    return Y`
      <div class="swiper-slide" style="height:auto;flex-shrink:0;box-sizing:border-box;">
        <a href="${i.link}" class="ml-card" data-sal="slide-up" data-sal-duration="700" data-sal-delay="${(t + 1) * 80}"
           style="display:flex;flex-direction:column;height:100%;text-decoration:none;border-radius:18px;overflow:hidden;background:rgba(8,8,10,0.72);border:1px solid rgba(255,255,255,0.08);box-shadow:0 2px 0 rgba(255,255,255,0.05) inset,0 8px 32px rgba(0,0,0,0.55);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1),border-color 0.3s,box-shadow 0.4s;">
          <div style="width:100%;aspect-ratio:4/3;overflow:hidden;">
            <img loading="lazy" src="${i.image}" alt="${i.title}" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s ease;">
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;gap:8px;">
            <h4 style="margin:0;font-size:0.9375rem;font-weight:500;color:#ffffff;line-height:1.4;">${i.title}</h4>
            <span class="ml-card-arrow" style="color:rgba(255,255,255,0.45);flex-shrink:0;transition:transform 0.3s,color 0.3s;display:inline-flex;">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </span>
          </div>
        </a>
      </div>
    `;
  }
  render() {
    const i = this.cfg;
    return Y`
      <style>
        .ml-section {
          position: relative; padding: 5rem 0; overflow: hidden;
          background: ${i.background};
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
              ${i.items.map((t, s) => this.renderLinkCard(t, s))}
            </div>
          </div>
          ${this.renderNavButtons()}
        </div>
      </section>
    `;
  }
}
Ie([
  ze({ type: Object })
], ee.prototype, "config");
Ie([
  Ae()
], ee.prototype, "sliderId");
typeof ee < "u" && ee.registerSallaComponent("salla-links");
export {
  ee as MainLinksStyle1
};
