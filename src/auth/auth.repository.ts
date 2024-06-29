import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SignUpDao } from './dao/sign.up';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(dao: SignUpDao) {
    try {
      const user = await this.prisma.user.create({
        data: dao,
      });

      return { message: 'Signup success!', user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}
