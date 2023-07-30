import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class LoginResponse {
  @IsBoolean()
  @ApiProperty({ example: 'true' })
  readonly verified: boolean;

  @IsString()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMTkyMjFlOC02NTg1LTQzYmYtOTQ3OS01MTAxMGQzODJhNWMiLCJpYXQiOjE2NTg5MDc0NjMsImV4cCI6MTY1OTUxMjI2M30.JliuTdGMGvYwNFvOzEPxWSO_orJAl9qB0Ggeb2Te_IQ',
  })
  readonly jwt: string;
}

export class LoginBadResponse {
  @IsBoolean()
  @ApiProperty({ example: null })
  readonly verified: boolean;

  @IsString()
  @ApiProperty({
    example: 'Invalid email or password.',
  })
  readonly message: string;
}
