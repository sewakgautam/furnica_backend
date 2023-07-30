import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Royal table' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: ['1', '2'] })
  category: string;

  @ApiProperty({
    example: 'Round dining table with metal legs',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: '550' })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: 'https://image.com/image.png',
  })
  @IsNotEmpty()
  @IsString()
  readonly imageUrl: string;

  @ApiProperty({ example: 'l:20,b:30,h:10' })
  @IsNotEmpty()
  @IsString()
  readonly dimensions: string;

  @ApiProperty({ example: 'metal/wood' })
  @IsNotEmpty()
  @IsString()
  readonly materials: string;

  @ApiProperty({
    example: 'In stock / Out of Stock',
  })
  @IsNotEmpty()
  @IsString()
  readonly status: string;
}
