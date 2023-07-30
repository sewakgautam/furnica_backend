import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    UserModule,
    OtpModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secret',
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
