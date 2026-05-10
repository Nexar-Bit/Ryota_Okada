/** Resolve `a.b.0.c` style paths including numeric array indices. */
export function getByPath(obj, path) {
  if (!path || obj == null) return undefined;
  const parts = path.split(".");
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    const n = Number(p);
    const key = Number.isInteger(n) && String(n) === p ? n : p;
    cur = cur[key];
  }
  return cur;
}
