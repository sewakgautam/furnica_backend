import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class filterProductDto {
  @ApiProperty({ example: 'Search' })
  @IsNotEmpty()
  @IsString()
  readonly search: string;
}
