import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    imageUrl: string
  ): Promise<CategoryResponseDto | null> {
    const lastCategory = await this.categoryModel
      .findOne()
      .sort({ order: -1 })
      .limit(1)
      .exec();
    const nextOrder = lastCategory ? lastCategory.order + 1 : 1;

    const createdCategory = new this.categoryModel({
      ...createCategoryDto,
      order: nextOrder,
      imageUrl
    });

    await createdCategory.save();
    return this.toResponseDto(createdCategory);
  }

  async findAll(): Promise<(CategoryResponseDto | null)[]> {
    const categories = await this.categoryModel
      .find()
      .sort({ order: 1 })
      .exec();
    return categories.map(this.toResponseDto);
  }

  async findOne(id: string): Promise<CategoryResponseDto | null> {
    const category = await this.categoryModel.findOne({ id }).exec();
    return this.toResponseDto(category!);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto | null,
  ): Promise<CategoryResponseDto | null> {
    const updatedCategory = await this.categoryModel
      .findOneAndUpdate({ id }, updateCategoryDto!, { new: true })
      .exec();
    return this.toResponseDto(updatedCategory!);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.categoryModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  private toResponseDto(category: Category): CategoryResponseDto | null {
    if (!category) return null;

    const categoryObj = category.toObject();
    return {
      name: categoryObj.name,
      id: categoryObj._id,
      order: categoryObj.order,
      active: categoryObj.active,
      imageUrl: categoryObj.imageUrl,
      createdAt: categoryObj.createdAt,
      updatedAt: categoryObj.updatedAt,
    };
  }
}
