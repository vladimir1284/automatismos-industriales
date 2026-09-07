/**
 * Normalizes text for consistent searching:
 * 1. Unicode NFD decomposition
 * 2. Remove diacritical marks
 * 3. Lowercase
 * 4. Replace non-[a-z0-9] characters with space
 * 5. Collapse spaces & trim
 */
export function normalize(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
