import { describe, it, expect } from 'vitest';
import { searchFuzzy } from '../src/search/fuzzy';

describe('searchFuzzy', () => {
  const candidates = [
    { item: 12, searchTitle: 'Proceso de electrólisis' },
    { item: 19, searchTitle: 'Estación automática de lavado de vehículos' },
    { item: 32, searchTitle: 'Proceso de lavadora industrial' },
    { item: 36, searchTitle: 'Central de lavado de autos 2' },
    { item: 48, searchTitle: 'La pasteurizadora de soja (dos estudiantes)' },
    { item: 101, searchTitle: 'María Elena López Cruz' },
    { item: 102, searchTitle: 'María López Peña' },
    { item: 103, searchTitle: 'Mario López Cruz' },
  ];

  it('matches multi-token queries regardless of token order', () => {
    const results = searchFuzzy('lopez maria', candidates);
    expect(results.length).toBeGreaterThan(0);
    const matchedIds = results.map((r) => r.item);
    expect(matchedIds).toContain(101);
    expect(matchedIds).toContain(102);
  });

  it('matches partial word "lavado" returning relevant variants', () => {
    const results = searchFuzzy('lavado', candidates);
    const ids = results.map((r) => r.item);
    expect(ids).toContain(19);
    expect(ids).toContain(36);
  });

  it('matches "electrolisis" without accent', () => {
    const results = searchFuzzy('electrolisis', candidates);
    expect(results.length).toBe(1);
    expect(results[0].item).toBe(12);
  });

  it('returns empty list for completely unmatched query', () => {
    const results = searchFuzzy('xyz123abc', candidates);
    expect(results).toEqual([]);
  });
});
