import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { UploadService } from 'src/shared/upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly uploadService: UploadService,
  ) {}

  @Post('with-image')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto | null,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CategoryResponseDto | null> {
    const imageUrl = await this.uploadService.uploadImage(file);
    return this.categoriesService.create(createCategoryDto!, imageUrl);
  }

  @Get()
  async findAll(): Promise<(CategoryResponseDto | null)[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto | null> {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto | null,
  ): Promise<CategoryResponseDto | null> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
