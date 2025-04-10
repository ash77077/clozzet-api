import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body, Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../shared/upload/upload.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from 'src/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Post('with-image')
  @UseInterceptors(FileInterceptor('image'))
  async createWithImage(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = await this.uploadService.uploadImage(file);
    console.log(555, imageUrl);
    return this.productsService.create(
      {
        ...createProductDto,
      },
      imageUrl,
    );
  }
}
