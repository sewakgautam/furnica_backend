// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Req,
//   UseGuards,
// } from '@nestjs/common';
// import { OrderService } from './order.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import { ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
// import { Order } from './entities/order.entity';
// @ApiTags('order')
// @Controller('orders')
// @UseGuards(AuthGuard())
// export class OrderController {
//   constructor(private orderService: OrderService) {}

//   @Post()
//   async createOrder(
//     @Req() req,
//     @Body() createOrderDto: CreateOrderDto,
//   ): Promise<Order> {
//     const user = req.user;
//     return this.orderService.createOrder(user, createOrderDto);
//   }

//   @Get()
//   async getOrdersForUser(@Req() req): Promise<Order[]> {
//     const user = req.user;
//     return this.orderService.getOrdersForUser(user);
//   }
// }
