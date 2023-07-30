// import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
// // import { CartService } from './cart.service';
// import { CreateCartDto } from './dto/create-cart.dto';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags('Cart')
// @Controller('cart')
// export class CartController {
// //   constructor(private readonly cartService: CartService) {}

//   @Post()
//   async addToCart(
//     userId: string,
//     //   @CurrentUser()
//     // user: UserRole.user,
//     @Body() cartDto: CreateCartDto,
//   ): Promise<void> {
//     await this.cartService.addToCart(userId, cartDto);
//   }

//   @Get()
//   async getCart(
//     //   @CurrentUser()
//     userId: string,
//   ): Promise<void> {
//     await this.cartService.getCart(userId);
//   }

//   @Delete(':id')
//   async removeFromCart(
//     //   @CurrentUser()
//     userId: string,
//     @Param('id') cartId: string,
//   ): Promise<void> {
//     await this.cartService.removeFromCart(userId, cartId);
//   }
// }
