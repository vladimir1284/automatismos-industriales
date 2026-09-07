import { describe, it, expect } from 'vitest';
import { renderPinnedMessage, AssignedVariantRow } from '../src/render/pinned';

describe('renderPinnedMessage', () => {
  it('formats pinned message within 4096 char limit when all 63 variants are assigned with long names', () => {
    const assignments: AssignedVariantRow[] = [];
    for (let i = 1; i <= 63; i++) {
      assignments.push({
        variant_id: i,
        variant_title: `Variante de Titulo Muy Largo Numero ${i} Nombre Completo`,
        people_names: ['Estudiante Con Nombre Bastante Largo Uno', 'Estudiante Dos Nombre Largo'],
        capacity: i === 48 || i === 59 ? 2 : 1,
      });
    }

    const output = renderPinnedMessage(
      'Automatismos Industriales 2026-1',
      assignments,
      65,
      0,
      0,
      'https://automatismos.ladetec.com/proyectos/',
      '07/09/2026 14:35'
    );

    expect(output.length).toBeLessThanOrEqual(4096);
    expect(output).toContain('📋 <b>VARIANTES ASIGNADAS');
    expect(output).toContain('Asignadas: 65 · Libres: 0 · Sin variante: 0');
  });
});
