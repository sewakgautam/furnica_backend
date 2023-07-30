import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  quantity: number;

  @Column()
  total: number;

  //   @Column()
  //   userId: string;
  //   @ManyToOne(() => User, (user) => user.order, { onDelete: 'CASCADE' })
  //   user: User;

  //   @Column()
  //   productId: string;
  //   @ManyToOne(() => Product, (product) => product.order, {
  //     onDelete: 'CASCADE',
  //   })
  //   product: Product;

  @ManyToMany(() => Product)
  @JoinTable()
  orderItems: Product[];
}
