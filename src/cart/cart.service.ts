// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateCartDto } from './dto/create-cart.dto';
// import { UpdateCartDto } from './dto/update-cart.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from 'src/user/entities/user.entity';
// import { UserService } from 'src/user/user.service';
// import { Repository } from 'typeorm';
// import { Cart } from './entities/cart.entity';
// import { ProductService } from 'src/product/product.service';

// @Injectable()
// export class CartService {
//   constructor(
//     @InjectRepository(Cart)
//     private readonly cartRepository: Repository<Cart>,
//     private readonly productService: ProductService,
//     private readonly userService: UserService,
//   ) {}

//   async addToCart(userId: string, cartDto: CreateCartDto): Promise<Cart> {
//     const user: User = await this.userService.findUserById(userId);
//     const product = await this.productService.findOne(cartDto.productId);

//     let cart: Cart = await this.cartRepository.findOne({
//       where: { user, product },
//     });

//     if (!cart) {
//       cart = new Cart();
//       cart.user = user;
//       cart.product = product;
//       cart.quantity = cartDto.quantity;
//     } else {
//       cart.quantity += cartDto.quantity;
//     }

//     return this.cartRepository.save(cart);
//   }

//   async getCart(userId: string): Promise<Cart[]> {
//     const user: User = await this.userService.findUserById(userId);
//     return this.cartRepository.find({
//       where: { user },
//       relations: ['product'],
//     });
//   }

//   async removeFromCart(userId: string, cartId: string): Promise<void> {
//     const user: User = await this.userService.findUserById(userId);
//     const cart: Cart = await this.cartRepository.findOne({
//       where: { id: cartId, user },
//     });

//     if (!cart) {
//       throw new NotFoundException('Cart item not found');
//     }

//     await this.cartRepository.remove(cart);
//   }
// }
