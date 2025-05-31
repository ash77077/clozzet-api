import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ContactModule } from 'src/contact/contact.module';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:3979/clozzet'),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    ContactModule,
    TelegramModule
  ],
})
export class AppModule {}
