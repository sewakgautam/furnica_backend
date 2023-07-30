import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  Matches,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'johnsmith@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'John  Smith' })
  @IsString()
  readonly name: string;

  @IsEnum(UserRole)
  @ApiProperty({ enum: ['VENDOR', 'USER'], default: UserRole.user })
  readonly role: UserRole;

  @ApiProperty({ example: 'ktm' })
  @IsString()
  @IsOptional()
  readonly address: string;

  @MinLength(7)
  @ApiProperty({ minLength: 7, example: 'Qwerty@123' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @ApiProperty({})
  readonly image: string;
}
