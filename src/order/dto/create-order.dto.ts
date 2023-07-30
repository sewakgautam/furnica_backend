import { IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  items: { productId: string; quantity: number; subTotal: string }[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  total: number;
}
