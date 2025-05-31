import { Injectable } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { CreateQuoteDto } from 'src/contact/dto/create-quote.dto';

@Injectable()
export class ContactService {
  constructor(private readonly telegramService: TelegramService) {}

  async handleContactForm(contactDto: CreateContactDto) {
    const message = `
*New Contact Form Submission* 📬
*Name*: ${contactDto.name}
*Email*: ${contactDto.email}
${contactDto.company ? `*Company*: ${contactDto.company}` : ''}
${contactDto.phone ? `*Phone*: ${contactDto.phone}` : ''}
*Message*: 
${contactDto.message}
    `.trim();
    await this.telegramService.sendMessage(message);
  }

  async handleQuoteRequest(quoteDto: CreateQuoteDto) {
    console.log(quoteDto);
    const message = `
*New Quote Request* 📋
*Client Name*:  ${quoteDto.clientName}
*Email*:  ${quoteDto.email}
*Phone*:  ${quoteDto.phone}
*Company Name*:  ${quoteDto.company}
*Employee Count*:  ${quoteDto.employeeCount}
*Quantity*:  ${quoteDto.quantity}
*Product Type*:  ${quoteDto.productType}
*Message*:  ${quoteDto.message}
    `.trim();
    await this.telegramService.sendMessage(message);
  }
}
