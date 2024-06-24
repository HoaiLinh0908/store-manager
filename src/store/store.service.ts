import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateStoreDto, EditStoreDto } from './dto';
import { StorePermission, StoreStatus } from 'src/utils/constants';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreService {
  constructor(private storeRepo: StoreRepository) {}

  async getStores(userId: number) {
    return await this.storeRepo.getStoresByUser(userId);
  }

  async getStoreById(userId: number, storeId: number) {
    return await this.storeRepo.getStoreById(userId, storeId);
  }

  async createStore(userId: number, dto: CreateStoreDto) {
    const dao = {
      status: StoreStatus.Active,
      users: [
        {
          assignedBy: userId.toString(),
          permission: StorePermission.Admin,
          userId,
        },
      ],
      ...dto,
    };

    return await this.storeRepo.createStore(dao);
  }

  async editStore(userId: number, storeId: number, dto: EditStoreDto) {
    const store = await this.storeRepo.getStoreById(userId, storeId);

    if (!store) {
      throw new ForbiddenException(
        `Store with id ${storeId} does not exist or you do not have permission`,
      );
    }

    return await this.storeRepo.editStore({ id: storeId, ...dto });
  }

  async deactivateStore(userId: number, storeId: number) {
    const store = await this.storeRepo.getStoreById(userId, storeId);
    if (!store) {
      throw new ForbiddenException(
        `Store with id ${storeId} does not exist or you do not have permission`,
      );
    }
    return await this.storeRepo.deactivateStore(storeId);
  }
}
