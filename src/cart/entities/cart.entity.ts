import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  quantity: number;

  @Column()
  total: number;

  //   @Column()
  //   userId: string;
  //   @ManyToOne(() => User, (user) => user.carts, {
  //     onDelete: 'CASCADE',
  //   })
  //   @JoinColumn({ name: 'userId' })
  //   user: User;

  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
