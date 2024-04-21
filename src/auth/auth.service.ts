import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signup(dto: AuthDto) {
    //generate password
    const hash = await argon.hash(dto.password);

    //save the new user
    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        hash,
        username: dto.email,
      },
    });

    //return the saved user
    return user;
  }

  signin() {
    return { msg: 'Sign in here' };
  }
}
