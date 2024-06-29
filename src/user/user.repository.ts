import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDao } from './dao/edit.user';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new ForbiddenException(`User not found - ${email}`);
    }
    return user;
  }

  async updateUser(userId: number, dao: EditUserDao) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dao,
      },
    });
  }
}
