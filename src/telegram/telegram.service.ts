import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;
  private readonly chatId: string;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID')!;

    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN not found in .env');
    }
    if (!this.chatId) {
      throw new Error('TELEGRAM_CHAT_ID not found in .env');
    }

    this.bot = new TelegramBot(token, { polling: false });
  }

  async onModuleInit() {
    try {
      await this.bot.getMe();
      console.log('Telegram bot connected successfully');
    } catch (error) {
      console.error('Failed to connect to Telegram bot:', error);
    }
  }

  async sendMessage(message: string, options: TelegramBot.SendMessageOptions = {}) {
    try {
      await this.bot.sendMessage(this.chatId, message, options);
      console.log(`Telegram message sent successfully to group chat ID: ${this.chatId}`);
    } catch (error) {
      console.error(`Error sending Telegram message to group chat ID: ${this.chatId}`, error);
    }
  }
}
