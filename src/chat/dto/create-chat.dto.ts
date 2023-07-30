import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsUUID()
  from: string;

  @IsNotEmpty()
  @IsUUID()
  to: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
