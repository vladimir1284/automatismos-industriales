export interface InlineKeyboardButton {
  text: string;
  callback_data?: string;
  url?: string;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

/**
 * Ensures callback_data is <= 64 bytes (Telegram Bot API limit).
 */
export function validateCallbackData(data: string): string {
  const bytes = new TextEncoder().encode(data).length;
  if (bytes > 64) {
    throw new Error(`callback_data exceeds 64 bytes (${bytes} bytes): "${data}"`);
  }
  return data;
}

/**
 * Creates an inline button with callback_data.
 */
export function callbackButton(text: string, data: string): InlineKeyboardButton {
  return {
    text,
    callback_data: validateCallbackData(data),
  };
}

/**
 * Creates an inline button with URL.
 */
export function urlButton(text: string, url: string): InlineKeyboardButton {
  return {
    text,
    url,
  };
}

/**
 * Builds an InlineKeyboardMarkup from rows of buttons.
 */
export function inlineKeyboard(rows: InlineKeyboardButton[][]): InlineKeyboardMarkup {
  return {
    inline_keyboard: rows,
  };
}
