// import { Injectable } from '@nestjs/common';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Product } from 'src/product/entities/product.entity';
// import { User } from 'src/user/entities/user.entity';
// import { Repository } from 'typeorm';
// import { Order } from './entities/order.entity';

// @Injectable()
// export class OrderService {
//   constructor(
//     @InjectRepository(Order)
//     private readonly orderRepository: Repository<Order>,
//     @InjectRepository(Product)
//     private readonly productRepository: Repository<Product>,
//   ) {}

//   async createOrder(
//     user: User,
//     createOrderDto: CreateOrderDto,
//   ): Promise<Order> {
//     const order = new Order();
//     order.user = user;
//     order.total = createOrderDto.total;
//     order.orderItems = [];

//     for (const item of createOrderDto.items) {
//       const product = await this.productRepository.findOne({
//         where: { id: item.productId },
//       });
//       order.orderItems.push(product);
//       //   order.orderItems.push({
//       // items: product,
//       //     quantity: item.quantity,
//       //     price: product.price,
//       //   });
//     }

//     return this.orderRepository.save(order);
//   }

//   async getOrdersForUser(user: User): Promise<Order[]> {
//     return this.orderRepository.find({ where: { user } });
//   }
//   //   create(createOrderDto: CreateOrderDto) {
//   //     return 'This action adds a new order';
//   //   }

//   //   findAll() {
//   //     return `This action returns all order`;
//   //   }

//   //   findOne(id: number) {
//   //     return `This action returns a #${id} order`;
//   //   }

//   //   update(id: number, updateOrderDto: UpdateOrderDto) {
//   //     return `This action updates a #${id} order`;
//   //   }

//   //   remove(id: number) {
//   //     return `This action removes a #${id} order`;
//   //   }
// }
