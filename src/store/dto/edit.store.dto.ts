import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
