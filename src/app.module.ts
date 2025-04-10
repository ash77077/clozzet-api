import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:3979/clozzet'),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule
  ],
})
export class AppModule {}
