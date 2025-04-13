import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body, Get, NotFoundException, Query, Param, Delete,
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

  @Get(':id')
  async getByCategory(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const products = await this.productsService.findByCategory(id);
    if (!products || products.length === 0) {
      throw new NotFoundException(`No products found in category ${id}`);
    }
    return products;
  }

  @Post('with-image')
  @UseInterceptors(FileInterceptor('image'))
  async createWithImage(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = await this.uploadService.uploadImage(file);
    return this.productsService.create(
      {
        ...createProductDto,
      },
      imageUrl,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    const result = await this.productsService.remove(id);
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { success: true };
  }
}
