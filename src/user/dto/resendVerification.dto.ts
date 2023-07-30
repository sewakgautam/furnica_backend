import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendEmailVerificationDto {
  @IsEmail()
  @ApiProperty({ example: 'abc@gmail.com' })
  readonly email: string;
}
