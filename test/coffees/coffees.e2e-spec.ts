import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpServer, HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';

import { CoffeesModule } from '../../src/coffees/coffees.module';
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto';

describe('[Feature] coffees - /coffees', () => {
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };

  let app: INestApplication;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'pass123',
            database: 'postgres',
            autoLoadEntities: true,
            synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }));
    await app.init();
    httpServer = app.getHttpServer();
  });

  it('Create [POST /]', () => {
    return request(httpServer)
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED);
  });
  it('Get all [GET /]', async () => {
    return request(httpServer)
      .get('/coffees')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Array);
      });
  });
  it('Get one [GET /:id]', async () => {
    return request(httpServer)
      .get(`/coffees/${1}`)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Object);
      });
  });
  it('Update one [PATCH /:id]', () => {
    return request(httpServer)
      .patch(`/coffees/${1}`)
      .expect(HttpStatus.OK)
  });
  it('Delete one [DELETE /:id]', () => {
    return request(httpServer)
    .delete(`/coffees/${1}`)
    .expect(HttpStatus.OK)
  });

  afterAll(async () => {
    await app.close();
  });
});