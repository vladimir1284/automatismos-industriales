import { describe, it, expect } from 'vitest';
import { callbackButton, validateCallbackData } from '../src/telegram/keyboard';

describe('validateCallbackData', () => {
  it('allows valid data under 64 bytes', () => {
    const valid = 'ok|12|48';
    expect(validateCallbackData(valid)).toBe(valid);
  });

  it('throws error if callback data exceeds 64 bytes', () => {
    const longData = 'a'.repeat(65);
    expect(() => validateCallbackData(longData)).toThrow(/exceeds 64 bytes/);
  });

  it('creates valid callback button', () => {
    const btn = callbackButton('Aprobar', 'rq|7|ap');
    expect(btn.text).toBe('Aprobar');
    expect(btn.callback_data).toBe('rq|7|ap');
  });
});
