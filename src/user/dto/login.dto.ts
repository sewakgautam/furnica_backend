import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class LoginDto {
  @ApiProperty({
    example: 'johnsmith@gmail.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'Qwerty@123',
  })
  @IsString()
  readonly password: string;
}
