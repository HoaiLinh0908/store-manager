import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditStoreDto } from './dto';
import { StoreStatus } from 'src/utils/constants';
import { CreateStoreDao, EditStoreDao } from './dao';

@Injectable()
export class StoreRepository {
  constructor(private prisma: PrismaService) {}

  async getStoresByUser(userId: number) {
    return await this.prisma.store.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });
  }

  async getStoreById(userId: number, storeId: number) {
    return await this.prisma.store.findUnique({
      where: {
        id: storeId,
        users: {
          some: {
            userId,
          },
        },
      },
    });
  }

  async createStore(dao: CreateStoreDao) {
    const { users, ...store } = dao;
    return await this.prisma.store.create({
      data: {
        users: {
          create: users,
        },
        ...store,
      },
    });
  }

  async editStore(dao: EditStoreDao) {
    const { id, ...info } = dao;
    return await this.prisma.store.update({
      where: {
        id,
      },
      data: {
        ...info,
      },
    });
  }

  async deactivateStore(storeId: number) {
    return await this.prisma.store.update({
      where: {
        id: storeId,
      },
      data: { status: StoreStatus.Inactive },
    });
  }
}
