import Category from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sales } from './sales.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @Column()
  dimensions: string;

  @Column()
  materials: string;

  @Column()
  status: string;

  @Column()
  userId: string;
  @ManyToOne(() => User, (user) => user.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'category_product',
    joinColumn: {
      name: 'id',
    },
    inverseJoinColumn: {
      name: 'id',
    },
  })
  category: Category[];

  //   @Column()
  //   orderId: string;
  //   @ManyToOne(() => Order, (order) => order.products)
  //   @JoinColumn({ name: 'orderId' })
  //   order: Order;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Sales, (sales) => sales.product, {
    onDelete: 'CASCADE',
  })
  sales: Sales;
}
