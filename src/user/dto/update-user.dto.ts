import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsOptional, MinLength, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty({ example: 'John Smith' })
  readonly name: string;

  @MinLength(7)
  @ApiProperty({ minLength: 9, example: 'Qwerty@123' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
