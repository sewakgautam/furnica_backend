import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { filterProductDto } from './dto/filterProduct.dto';
import Category from 'src/category/entities/category.entity';
import { Sales } from './entities/sales.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Sales)
    private readonly saleRepo: Repository<Sales>,
  ) {}

  async create(createProductDto: CreateProductDto, userId: string) {
    // const category = categoryId ? { id: categoryId } : undefined;
    console.log(createProductDto);
    const categories = Object.keys(createProductDto.category);
    const categoriesData = [];
    if (!categories) {
      throw new BadRequestException('Cannot Add product without category');
    }
    for await (const categoryId of categories) {
      const category = await this.categoryRepository.findOne({
        where: { id: +categoryId },
      });
      categoriesData.push(category);
    }
    categories.map(async (each) => {
      const category = await this.categoryRepository.findOne({
        where: { id: +each },
      });
      categoriesData.push(category);
    });
    const product = this.productRepository.create({
      ...createProductDto,
      userId: userId,
      category: categoriesData,
    });
    const saveProduct = await this.productRepository.save(product);
    return saveProduct;
  }

  async findAll() {
    const findAll = await this.productRepository.findAndCount();
    if (!findAll) throw new BadRequestException('No products found');

    return findAll;
  }

  async findOne(id: string) {
    const findOne = await this.productRepository.findOne({ where: { id: id } });
    if (!findOne) throw new BadRequestException('product not found');
    return findOne;
  }
  // async update(id: string, updateProductDto: UpdateProductDto) {
  //   const { categoryId, ...rest } = updateProductDto;
  //   const category = categoryId ? { id: categoryId } : undefined;
  //   const updateResult = await this.productRepository.update(
  //     { id },
  //     { ...rest, category },
  //   );

  //   const { affected } = updateResult;
  //   if (affected === 0) {
  //     throw new NotFoundException(`Product with ID ${id} not found`);
  //   }

  //   return updateResult;
  // }

  async remove(id: string) {
    const result = await this.productRepository.delete(id);
    return result;
  }

  async getFilteredProduct(filterProductDto: filterProductDto) {
    const { search } = filterProductDto;
    let product = await this.getAllProducts();
    if (search) {
      product = product.filter(
        (product) =>
          product.name.includes(search) || product.description.includes(search),
      );
    }

    return product;
  }
  async getAllProducts() {
    const products = await this.productRepository.find();
    return products;
  }

  async buy(productId: string, userId: string) {
    const products = await this.productRepository.findOneBy({ id: productId });

    console.log(products);

    if (!products) {
      throw new NotFoundException('Product Not Exist');
    }

    const sales = await this.saleRepo.save({
      productId,
      userId,
    });

    return { ...sales, message: 'Product Buy Success' };
  }
}
