import { Module } from '@nestjs/common';
// import { CartService } from './cart.service';
// import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), ProductModule, UserModule],
//   controllers: [CartController],
  providers: [ ProductService, UserService],
})
export class CartModule {}
