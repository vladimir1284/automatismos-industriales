import { describe, it, expect } from 'vitest';
import { normalize } from '../src/search/normalize';

describe('normalize', () => {
  it('strips accents and converts to lowercase', () => {
    expect(normalize('María Elena López Cruz')).toBe('maria elena lopez cruz');
    expect(normalize('Máquina de llenado y tapado')).toBe('maquina de llenado y tapado');
    expect(normalize('ÁÉÍÓÚ ñ Ámbar')).toBe('aeiou n ambar');
  });

  it('removes non-alphanumeric chars and collapses spaces', () => {
    expect(normalize('  Célula   de - fabricación!!  ')).toBe('celula de fabricacion');
    expect(normalize('Vaciado continuo... ACINOX-Tunas')).toBe('vaciado continuo acinox tunas');
  });

  it('handles empty input', () => {
    expect(normalize('')).toBe('');
  });
});
