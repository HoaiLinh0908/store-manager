/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.userRepo.updateUser(userId, dto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...userInfo } = user;
    return userInfo;
  }
}
