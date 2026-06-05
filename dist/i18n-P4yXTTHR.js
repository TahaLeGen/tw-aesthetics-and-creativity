function i(n, t = "") {
  if (n == null) return t;
  if (typeof n == "string") return n || t;
  if (typeof n == "object") {
    const r = (document.documentElement.lang || "ar").split("-")[0].toLowerCase(), e = n[r] || n.ar || n.en || Object.values(n).find((o) => typeof o == "string" && o.length > 0);
    return (typeof e == "string" ? e : t) || t;
  }
  return t;
}
function s(n, t) {
  var r;
  if (Array.isArray(n) && n.length > 0) {
    const e = ((r = n[0]) == null ? void 0 : r.value) ?? n[0], o = Number(e);
    return isNaN(o) ? t : o;
  }
  if (n != null && typeof n == "object") {
    const e = n.value, o = Number(e);
    return isNaN(o) ? t : o;
  }
  if (n != null) {
    const e = Number(n);
    return isNaN(e) ? t : e;
  }
  return t;
}
export {
  i as l,
  s as r
};
