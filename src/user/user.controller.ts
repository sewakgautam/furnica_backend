import {
  Controller,
  Post,
  Body,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';

import {
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename, imageFileFilter } from 'src/auth/helpers/image-storage';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  initiateResetPasswordDto,
  finalizeResetPasswordDto,
} from './dto/reset-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '  user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  async findAll(id: string) {
    return this.userService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'static/user/image',
        filename,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiOperation({ summary: 'edit user' })
  @Patch('update ')
  async editUser(
    @GetUser('id') userId: string,
    @Body() input: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      input.image = file.path;
    }
    return this.userService.editUser(userId, input);
  }

  @ApiOperation({ summary: 'forgot password' })
  @Post('forgot-password')
  async intiateResetPassword(@Body() input: initiateResetPasswordDto) {
    await this.userService.initiateResetPassword(input.email);
    return { message: 'Password reset OTP sent.' };
  }
  @ApiOperation({ summary: 'reset password' })
  @Patch('reset-password')
  async finalizeResetPassword(@Body() input: finalizeResetPasswordDto) {
    return this.userService.finalizeResetPassword(
      input.email,
      input.code,
      input.password,
    );
  }
}
