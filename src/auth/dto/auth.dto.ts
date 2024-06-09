import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail() //add validation for request body
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
