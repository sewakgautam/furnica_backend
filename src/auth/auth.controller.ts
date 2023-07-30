import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  SetMetadata,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/user/dto/login.dto';
import { LoginResponse, LoginBadResponse } from 'src/user/dto/login.response';
import {
  EmailVerificationDto,
  ResendEmailVerificationDto,
} from 'src/user/dto/emailVerification.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginResponse })
  @ApiBadRequestResponse({ type: LoginBadResponse })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return user;
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('resend-verification')
  async resendEmailVerificationCode(@Body() input: ResendEmailVerificationDto) {
    return await this.authService.resendEmailVerification(input);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verification')
  async emailVerification(@Body() input: EmailVerificationDto) {
    return await this.authService.verifyEmail(input.email, input.code);
  }
}
