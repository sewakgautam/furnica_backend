import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { OTPType } from 'src/otp/entities/otp.entity';
import { OtpService } from 'src/otp/otp.service';

import * as argon from 'argon2';
import path from 'path';
import sharp from 'sharp';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly otpService: OtpService,
    private readonly mailService: MailerService,
  ) {}

  getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
  findUserById(id: string) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async verifyEmail(email: string, code: string) {
    const user = await this.getUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    if (user.isVerified)
      throw new BadRequestException('User already verified.');

    const isValid = await this.otpService.validateOTP(
      user.id,
      code,
      OTPType.emailVerification,
    );
    if (!isValid) throw new NotFoundException('Invalid OTP');

    user.isVerified = true;
    await this.userRepository.save(user);
    await this.otpService.deleteOTP(user.id, code, OTPType.emailVerification);
  }

  async create(email: string, password: string, name: string, role: string) {
    const hashPass = await argon.hash(password);
    const user = new User();
    user.email = email;
    user.password = hashPass;
    user.role = UserRole[role];
    user.name = name;

    console.log(user);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
    console.log(savedUser);
  }

  async editUser(userId: string, input: UpdateUserDto) {
    const { ...user }: any = input;
    if (input.password) user.password = await argon.hash(input.password);

    if (input.image) {
      const avatarName =
        path.dirname(input.image) +
        '/mini-avatar-' +
        path.basename(input.image);

      try {
        await sharp(input.image)
          .resize(100, 100)
          .webp({ quality: 50 })
          .toFile(avatarName);
        user.miniAvatar = avatarName;
      } catch (err) {}
    }

    const updatedUser = await this.userRepository
      .createQueryBuilder()
      .update({ ...user, isVerified: true })
      .where('id = :id', { id: userId })
      .returning([
        'id',
        'email',
        'name',
        'image',
        'role',
        'phoneNumber',
        'password',
        'address',
        'isVerified',
        'panNumber',
        'regNumber',
        'createdAt',
        'updatedAt',
      ])
      .updateEntity(true)
      .execute();

    return updatedUser.raw[0];
  }

  async initiateResetPassword(email: string) {
    const user = await this.getUserByEmail(email);
    if (!user) throw new NotFoundException("User doesn't exists");
    const otp = await this.otpService.createOTP(user.id, OTPType.passwordReset);

    await this.mailService.sendMail({
      to: `${user.email}`,
      from: 'furnicapvtltd@gmail.com',
      subject: 'Verify your OTP',
      text: `Your OTP is ${otp}`,
    });
    console.log(`${otp.code}`);
    await this.userRepository.save(user);
  }

  //finalize-reset-password
  async finalizeResetPassword(email: string, code: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) throw new NotFoundException('User ');
    const isValid = await this.otpService.validateOTP(
      user.id,
      code,
      OTPType.passwordReset,
    );
    if (!isValid) throw new NotFoundException('Invalid OTP');

    user.password = await argon.hash(password);
    await this.userRepository.save(user);
    await this.otpService.deleteOTP(user.id, code, OTPType.passwordReset);
    return { message: 'Password reset successfully.' };
  }
}
