import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryModule } from 'src/category/category.module';
import Category from 'src/category/entities/category.entity';
import { Sales } from './entities/sales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Sales])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
