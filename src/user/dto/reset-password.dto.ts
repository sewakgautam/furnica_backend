import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class initiateResetPasswordDto {
  @IsEmail()
  @ApiProperty({ example: 'abc@gmail.com' })
  readonly email: string;
}
export class finalizeResetPasswordDto {
  @IsEmail()
  @ApiProperty({ example: 'abc@gmail.com' })
  readonly email: string;
  @ApiProperty({ example: 'abc@gmail.com' })
  @IsString()
  @MinLength(6)
  readonly code: string;
  @IsString()
  @MinLength(9)
  @ApiProperty({
    example: 'Qwerty@123',
    minimum: 8,
  })
  readonly password: string;
}
