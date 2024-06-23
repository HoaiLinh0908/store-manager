import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateStoreDto, EditStoreDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorePermission, StoreStatus } from 'src/utils/constants';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async getStores(userId: number) {
    //TODO: Should create another level to work with the DB -> DRY -> Single Responsibility
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

  async createStore(userId: number, dto: CreateStoreDto) {
    const store = await this.prisma.store.create({
      data: {
        users: {
          create: [
            {
              assignedBy: userId.toString(),
              permission: StorePermission.Admin,
              userId,
            },
          ],
        },
        status: StoreStatus.Active,
        ...dto,
      },
    });

    return store;
  }

  async editStore(userId: number, storeId: number, dto: EditStoreDto) {
    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
        users: {
          some: { userId },
        },
      },
    });

    if (!store) {
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
        users: {
          some: { userId },
        },
      },
    });

    if (!store) {
      throw new ForbiddenException(
        `Store with id ${storeId} does not exist or does not have owner`,
      );
    }

    //TODO: Remove records in the StoresOnUsers table too
    return await this.prisma.store.update({
      where: {
        id: storeId,
      },
      data: { status: StoreStatus.Inactive },
    });
  }
}
