import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

import { MailerService } from '@nestjs-modules/mailer';
import * as argon from 'argon2';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ResendEmailVerificationDto } from 'src/user/dto/emailVerification.dto';
import { OtpService } from 'src/otp/otp.service';
import { OTPType } from 'src/otp/entities/otp.entity';
import { LoginDto } from 'src/user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailService: MailerService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
  ) {}

  hashPassword(password: string) {
    return argon.hash(password);
  }
  doesUserExist(email: string) {
    return this.userService.getUserByEmail(email);
  }
  async registerUser(user: User) {
    const { email, password, name, role } = user;
    const hashedPassword = this.hashPassword(password);
    return this.userService.create(email, await hashedPassword, name, role);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    console.log(password, user);
    const matchPassword = await argon.verify(user.password, password);
    if (user && matchPassword) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(loginDto: LoginDto) {
    console.log(loginDto);
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new Error('Invalid email or password.');
    }
    console.log(user);

    const playLoad = {
      email: user.email,
      userId: user.id,
      role: user.role,
    };
    const token = this.jwtService.sign(playLoad, {
      expiresIn: '2d',
      secret: 'secretKey',
    });
    console.log(token);
    return { accessToken: token, role: user.role };
  }

  async verifyEmail(email: string, code: string) {
    await this.userService.verifyEmail(email, code);

    return { message: 'Email has been successfully verified.' };
  }

  async register(userDto: CreateUserDto) {
    const emailExists = await this.userService.getUserByEmail(userDto.email);
    if (emailExists) {
      throw new BadRequestException({
        message: 'Email already exists.',
      });
    }

    const { ...savedUser } = await this.userService.create(
      userDto.email,
      userDto.password,
      userDto.name,
      userDto.role,
    );

    const otp = await this.otpService.createOTPEmailVerification(savedUser.id);
    console.log(otp);

    //send mail

    // await this.mailService.sendMail({
    //   to: `${userDto.email}`,
    //   from: 'furnicapvtltd@gmail.com',
    //   subject: 'Verify your OTP',
    //   text: `Your OTP is ${otp}`,
    // });

    return savedUser;
  }

  async resendEmailVerification(input: ResendEmailVerificationDto) {
    const user = await this.userService.getUserByEmail(input.email);
    if (!user) throw new NotFoundException('User not found');
    if (user.isVerified)
      throw new BadRequestException('User already verified.');

    const previousOtp = await this.otpService.findLastOtp(
      user.id,
      OTPType.emailVerification,
    );

    if (previousOtp) {
      const waitTime = 1000 * 60 * 1; // resend only after one minute
      const completedWaitTime =
        previousOtp.createdAt.getTime() + waitTime < Date.now();
      if (!completedWaitTime) {
        throw new BadRequestException('Please request OTP after one minute.');
      }
    }

    // send email with OTP
    const otp = await this.otpService.createOTP(
      user.id,
      OTPType.emailVerification,
    );

    await this.mailService.sendMail({
      to: `${user.email}`,
      from: 'furnicapvtltd@gmail.com',
      subject: 'Email Verification',
      text: `Your Email Verification OTP is ${otp.code}`,
    });
  }

  getJwtUser(jwt: string) {
    return this.jwtService.verifyAsync(jwt);
  }
}
