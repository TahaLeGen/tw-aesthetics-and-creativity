/**
 * Centralized multilanguage string resolver.
 *
 * The Salla platform passes multilanguage fields as either:
 *   - A plain string:  "Hello"
 *   - A locale object: { ar: "مرحبا", en: "Hello" }
 *
 * This utility resolves the correct value for the current page locale,
 * falling back gracefully through ar → en → first available value.
 */

type LocaleMap = { ar?: string; en?: string; [lang: string]: string | undefined };

/**
 * Returns the resolved string for the current document language.
 * Safe to call on any value — returns empty string for null/undefined.
 */
export function localizedString(
  value: string | LocaleMap | null | undefined,
  fallback = ''
): string {
  if (value === null || value === undefined) return fallback;

  // Plain string — already resolved
  if (typeof value === 'string') return value || fallback;

  // Locale object
  if (typeof value === 'object') {
    const lang = (document.documentElement.lang || 'ar').split('-')[0].toLowerCase();

    // Try exact lang match first, then ar, then en, then first available
    const resolved =
      value[lang] ||
      value['ar'] ||
      value['en'] ||
      Object.values(value).find(v => typeof v === 'string' && v.length > 0);

    return (typeof resolved === 'string' ? resolved : fallback) || fallback;
  }

  return fallback;
}

/**
 * Resolves a dropdown field that may arrive as:
 *   - plain number/string
 *   - { label, value, key } object
 *   - [{ label, value, key }] array (selected items)
 */
export function resolveDropdown<T = number>(
  raw: unknown,
  fallback: T
): T {
  if (Array.isArray(raw) && raw.length > 0) {
    const v = raw[0]?.value ?? raw[0];
    const n = Number(v);
    return (isNaN(n) ? fallback : n) as T;
  }
  if (raw !== null && raw !== undefined && typeof raw === 'object') {
    const v = (raw as Record<string, unknown>)['value'];
    const n = Number(v);
    return (isNaN(n) ? fallback : n) as T;
  }
  if (raw !== null && raw !== undefined) {
    const n = Number(raw);
    return (isNaN(n) ? fallback : n) as T;
  }
  return fallback;
}
