import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum';
import { SignUpDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';

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

  const dto: SignUpDto = {
    email: 'linh@test.com',
    password: '123',
    firstName: 'Linh',
    lastName: 'Do',
  };

  //These tests are depended on the execution order
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
          Authorization: 'Bearer $S{userToken}', //$S{} is a Pactum syntax to get stored data
        })
        .expectStatus(200);
    });

    it('Edit user', () => {
      const newInfo: EditUserDto = { username: 'new name' };
      return pactum
        .spec()
        .post('/users/edit')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .withBody(newInfo)
        .expectStatus(200)
        .expectBodyContains(newInfo.username);
    });
  });

  describe('Stores', () => {
    it('Get stores of a user', () => {
      return pactum
        .spec()
        .get('/stores')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .expectStatus(200)
        .expectBodyContains([]);
    });

    it('Create new store', () => {
      const dto = { name: 'store1', description: 'Here is the description' };
      return pactum
        .spec()
        .post('/stores/create')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('storeId', 'id');
    });

    it('Get store by id', () => {
      return pactum
        .spec()
        .get('/stores/{id}')
        .withPathParams('id', '$S{storeId}')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .withBody(dto)
        .expectStatus(200);
    });

    it('Edit store', () => {
      const dto = {
        name: 'new name for store',
        description: 'okay this is the description',
      };
      return pactum
        .spec()
        .post('/stores/edit/{id}')
        .withPathParams('id', '$S{storeId}')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .withBody(dto)
        .expectStatus(201)
        .expectBodyContains(dto.name)
        .expectBodyContains(dto.description);
    });

    it('Delete store', () => {
      return pactum
        .spec()
        .post('/stores/delete/{id}')
        .withPathParams('id', '$S{storeId}')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}',
        })
        .expectStatus(201);
    });
  });
});
