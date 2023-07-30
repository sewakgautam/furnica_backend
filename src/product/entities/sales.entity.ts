import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('sales')
export class Sales {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  date: Date;

  // relations
  @ManyToOne(() => Product, (product) => product.sales)
  @JoinColumn({ name: 'productId' })
  product: Product[];

  @ManyToOne(() => User, (user) => user.sales)
  @JoinColumn({ name: 'userId' })
  user: User;
}
