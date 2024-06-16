import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

//Use class here because classes are part of the JS ES6 standard and are not removed during the transpliation
export class AuthDto {
  @IsEmail() //add validation for request body
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
