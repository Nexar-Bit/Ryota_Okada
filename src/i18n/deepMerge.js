/** Deep-merge objects; arrays from `b` replace arrays in `a` entirely. */
export function deepMerge(a, b) {
  if (b === undefined || b === null) return a;
  if (a === undefined || a === null) return b;
  if (Array.isArray(b)) return b.slice();
  if (typeof b !== "object" || typeof a !== "object") return b;
  const out = { ...a };
  for (const key of Object.keys(b)) {
    const bv = b[key];
    const av = a[key];
    if (bv && typeof bv === "object" && !Array.isArray(bv)) {
      out[key] = deepMerge(av && typeof av === "object" && !Array.isArray(av) ? av : {}, bv);
    } else {
      out[key] = bv;
    }
  }
  return out;
}
