import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { StoreService } from './store.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { CreateStoreDto } from './dto';
import { EditStoreDto } from './dto/edit.store.dto';

@UseGuards(JwtGuard)
@Controller('stores')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get()
  getStores(@GetUser() user: User) {
    return this.storeService.getStores(user.id);
  }

  @Get(':id')
  getStoreById(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) storeId: number,
  ) {
    return this.storeService.getStoreById(user.id, storeId);
  }

  @Post('/create')
  createStore(@GetUser() user: User, @Body() dto: CreateStoreDto) {
    return this.storeService.createStore(user.id, dto);
  }

  @Post('/edit/:id')
  editStore(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) storeId: number,
    @Body() dto: EditStoreDto,
  ) {
    return this.storeService.editStore(user.id, storeId, dto);
  }

  @Post('/delete/:id')
  deleteStore(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) storeId: number,
  ) {
    this.storeService.deactivateStore(user.id, storeId);
  }
}
