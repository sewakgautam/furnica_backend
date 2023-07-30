import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { OTP, OTPType } from './entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OTP)
    private readonly otpRepo: Repository<OTP>,
  ) {}

  generateOTP = async () => {
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    console.log(OTP);
    return OTP;
  };

  async createOTPEmailVerification(userId: string): Promise<OTP> {
    const otp = new OTP();
    otp.code = await this.generateOTP();
    otp.userId = userId;
    otp.type = OTPType.emailVerification;
    return await this.otpRepo.save(otp);
  }

  async createOTP(userId: string, code: string): Promise<OTP> {
    const otp = new OTP();
    otp.userId = userId;
    otp.code = await this.generateOTP();
    otp.type = OTPType.passwordReset;
    return await this.otpRepo.save(otp);
  }

  async deleteOTP(userId: string, code: string, type: OTPType) {
    return this.otpRepo.delete({ userId, code, type });
  }

  async validateOTP(userId: string, code: string, type: OTPType) {
    // OTP is valid for 10 minutes only
    const expiryTime = 1000 * 60 * 10;

    const otp = await this.otpRepo.findOne({
      where: { userId, code, type },
    });
    if (!otp) throw new NotFoundException('Invalid OTP');

    if (otp.createdAt.getTime() + expiryTime < Date.now()) {
      throw new BadRequestException('OTP has expired!');
    }
    return true;
  }

  async findLastOtp(userId: string, type: OTPType) {
    return await this.otpRepo.findOne({
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
