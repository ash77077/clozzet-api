import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductCategory } from './interfaces/product-category.interface';
import { Category } from 'src/categories/schemas/category.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createProductDto: CreateProductDto, imageUrl: string): Promise<ProductResponseDto> {
    const createdProduct = new this.productModel({
      ...createProductDto,
      imageUrl,
    });
    await createdProduct.save();
    return this.toResponseDto(createdProduct);
  }

  async findAll(): Promise<ProductCategory> {
    const products = await this.productModel.find().exec();
    return products.reduce((acc, product) => {
      const productDto = this.toResponseDto(product);
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(productDto);
      return acc;
    }, {});
  }

  async findByCategory(
    id: string
  ): Promise<Product[]> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new Error('Category not found');
    }
    return this.productModel
      .find({ category: category.name }) // or category._id if you're referencing by ID
      .exec();
  }

  private toResponseDto(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
    };
  }

  async remove(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
