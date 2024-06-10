import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMe(@GetUser() user: User) {
    console.log('User in request: ' + user);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit')
  editUser(@GetUser() user: User, @Body() dto: EditUserDto) {
    return this.userService.editUser(user.id, dto);
  }
}
