import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OTPType {
  emailVerification = 'EMAIL_VERIFICATION',
  passwordReset = 'PASSWORD_RESET',
  other = 'OTHER',
}

@Entity('otp')
export class OTP {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 6,
  })
  code: string;

  @Column({
    type: 'enum',
    enum: OTPType,
    default: OTPType.other,
  })
  type: OTPType;

  @Column()
  userId: string;
  @ManyToOne(() => User, (user) => user.otp, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
