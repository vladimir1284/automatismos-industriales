import { InlineKeyboardMarkup } from './keyboard';

export interface TelegramResponse<T = any> {
  ok: boolean;
  result?: T;
  description?: string;
  error_code?: number;
  parameters?: {
    retry_after?: number;
  };
}

export class TelegramApi {
  private botToken: string;
  private baseUrl: string;

  constructor(botToken: string) {
    this.botToken = botToken;
    this.baseUrl = `https://api.telegram.org/bot${botToken}`;
  }

  private async callApi<T>(method: string, payload: Record<string, any>): Promise<T | null> {
    const url = `${this.baseUrl}/${method}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as TelegramResponse<T>;
      if (!data.ok) {
        console.error(`Telegram API error [${method}]:`, data.description, data);
        if (data.error_code === 429 && data.parameters?.retry_after) {
          console.warn(`Rate limited by Telegram API. Retry after ${data.parameters.retry_after}s`);
        }
        return null;
      }
      return data.result ?? null;
    } catch (err) {
      console.error(`Failed to fetch Telegram API [${method}]:`, err);
      return null;
    }
  }

  async sendMessage(params: {
    chat_id: number | string;
    text: string;
    parse_mode?: 'HTML' | 'MarkdownV2';
    reply_markup?: InlineKeyboardMarkup;
    disable_web_page_preview?: boolean;
    disable_notification?: boolean;
  }) {
    return this.callApi<{ message_id: number }>('sendMessage', {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      ...params,
    });
  }

  async editMessageText(params: {
    chat_id: number | string;
    message_id: number;
    text: string;
    parse_mode?: 'HTML' | 'MarkdownV2';
    reply_markup?: InlineKeyboardMarkup;
    disable_web_page_preview?: boolean;
  }) {
    return this.callApi<{ message_id: number }>('editMessageText', {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      ...params,
    });
  }

  async editMessageReplyMarkup(params: {
    chat_id: number | string;
    message_id: number;
    reply_markup?: InlineKeyboardMarkup;
  }) {
    return this.callApi<{ message_id: number }>('editMessageReplyMarkup', params);
  }

  async answerCallbackQuery(params: {
    callback_query_id: string;
    text?: string;
    show_alert?: boolean;
  }) {
    return this.callApi<boolean>('answerCallbackQuery', params);
  }

  async deleteMessage(params: { chat_id: number | string; message_id: number }) {
    return this.callApi<boolean>('deleteMessage', params);
  }

  async pinChatMessage(params: {
    chat_id: number | string;
    message_id: number;
    disable_notification?: boolean;
  }) {
    return this.callApi<boolean>('pinChatMessage', params);
  }
}
