import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Set the validation pipe for the whole app. @IsString(), etc. can work because of this.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //strip elements that are not defined in the DTO from the request body
    }),
  );
  await app.listen(3456);
}
bootstrap();
