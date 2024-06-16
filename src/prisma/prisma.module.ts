import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //With this decorator, just import this module into any module, every other module can use its exports
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Any modules that import this module can inject the PrismaService
})
export class PrismaModule {}
