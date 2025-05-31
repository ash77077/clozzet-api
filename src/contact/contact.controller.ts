import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { CreateQuoteDto } from 'src/contact/dto/create-quote.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async submitContactForm(@Body() createContactDto: CreateContactDto) {
    await this.contactService.handleContactForm(createContactDto);
    return { message: 'Form submitted successfully' };
  }

  @Post('quote')
  @HttpCode(HttpStatus.OK)
  async submitQuoteRequest(@Body() createQuoteDto: CreateQuoteDto) {
    await this.contactService.handleQuoteRequest(createQuoteDto);
    return { message: 'Quote request submitted successfully' };
  }
}
