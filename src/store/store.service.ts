import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateStoreDto, EditStoreDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async getStores(userId: number) {
    return await this.prisma.store.findMany({
      where: {
        userId,
      },
    });
  }

  async getStoreById(userId: number, storeId: number) {
    return await this.prisma.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
  }

  async createStore(userId: number, dto: CreateStoreDto) {
    const store = await this.prisma.store.create({
      data: { userId, ...dto },
    });

    return store;
  }

  async editStore(userId: number, storeId: number, dto: EditStoreDto) {
    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store || store.userId != userId) {
      throw new ForbiddenException(
        `Store with id ${storeId} does not exist or does not have owner`,
      );
    }

    return await this.prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteStore(userId: number, storeId: number) {
    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store || store.userId != userId) {
      throw new ForbiddenException(
        `Store with id ${storeId} does not exist or does not have owner`,
      );
    }

    return await this.prisma.store.delete({
      where: {
        id: storeId,
      },
    });
  }
}
