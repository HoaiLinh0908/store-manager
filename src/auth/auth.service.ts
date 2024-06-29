import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserStatus } from 'src/utils/constants';
import { AuthRepository } from './auth.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private repo: AuthRepository,
    private userRepo: UserRepository,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpDto) {
    const hash = await argon.hash(dto.password);
    return this.repo.createUser({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      hash,
      status: UserStatus.Active,
    });
  }

  async signin(dto: AuthDto) {
    const user = await this.userRepo.findUserByEmail(dto.email);
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: token,
    };
  }
}
