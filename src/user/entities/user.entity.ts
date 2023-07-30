import { Cart } from 'src/cart/entities/cart.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { Order } from 'src/order/entities/order.entity';
import { OTP } from 'src/otp/entities/otp.entity';
import { Product } from 'src/product/entities/product.entity';
import { Sales } from 'src/product/entities/sales.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  admin = 'ADMIN',
  vendor = 'VENDOR',
  user = 'USER',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole;

  @Column({ nullable: true })
  address: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  panNumber: string;

  @Column({ nullable: true })
  regNumber: string;

  @Column({ nullable: true })
  gender: number;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OTP, (otp) => otp.user)
  otp: OTP[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product[];

  @OneToMany(() => Chat, (chat) => chat.sender)
  senders: Chat[];

  @OneToMany(() => Chat, (chat) => chat.receiver)
  receivers: Chat[];

  //   @OneToMany(() => Order, (order) => order.user)
  //   order: Product[];

  //   @OneToMany(() => Cart, (cart) => cart.user)
  //   carts: Cart[];

  @OneToMany(() => Sales, (sal) => sal.user)
  sales: Sales[];
}
