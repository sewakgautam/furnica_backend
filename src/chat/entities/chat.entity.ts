import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  message: string;

  @Column()
  senderId: string;
  @ManyToOne(() => User, (user) => user.senders, { onDelete: 'CASCADE' })
  sender: User;

  @Column()
  receiverId: string;
  @ManyToOne(() => User, (user) => user.receivers, { onDelete: 'CASCADE' })
  receiver: User;

  @UpdateDateColumn()
  updatedAt: Date;
}
