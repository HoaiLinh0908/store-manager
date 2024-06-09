import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    //Mimic the main.ts to create a Nest app
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    //Start the app on port 3456
    //await app.init();
    await app.listen('3456');

    prismaService = app.get(PrismaService);
    await prismaService.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3456');
  });

  afterAll(() => {
    app.close();
  });

  const dto: AuthDto = {
    email: 'linh@test.com',
    password: '123',
  };

  describe('Authentication', () => {
    it('Should signup', () => {
      return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(200);
    });

    it('Should signin', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .expectStatus(200)
        .stores('userToken', 'access_token');
    });
  });

  describe('Users', () => {
    it('Get me', () => {
      return pactum
        .spec()
        .get('/users/me')
        .withBody(dto)
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .expectStatus(200)
        .inspect();
    });
  });
});
