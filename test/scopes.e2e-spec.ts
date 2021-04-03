import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Scopes (e2e)', () => {
  let app: INestApplication;
  // const scopesRepository = {
  //   getCollections: () => [],
  //   create: () => [],
  //   findAnd: () => null,
  //   findOr: () => null,
  // };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideProvider(ScopesRepository)
      // .useValue(scopesRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Mutation scopeFind (Ok)', () => {
    const query = `
      query($find: FindScopeInput!) {
        scopeFind(find: $find) {
          name
        }
      }
    `;
    const variables = {
      find: { name: 'scopes_find' },
    };
    const resultExpected = {
      data: {
        scopeFind: { name: variables.find.name },
      },
    };

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({ query, variables })
      .expect(200)
      .expect(resultExpected);
  });

  it('Mutation scopeFind (Not Found)', () => {
    const query = `
      query($find: FindScopeInput!) {
        scopeFind(find: $find) {
          name
        }
      }
    `;
    const variables = {
      find: { name: 'scopes_fin' },
    };
    const resultExpected = {
      errors: [
        {
          message: 'Not Found',
          locations: [{ line: 3, column: 9 }],
          path: ['scopeFind'],
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            exception: {
              response: { statusCode: 404, message: 'Not Found' },
              status: 404,
              message: 'Not Found',
            },
          },
        },
      ],
      data: null,
    };

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({ query, variables })
      .expect(200)
      .expect(resultExpected);
  });

  it('Mutation scopeFind (Bad Request)', () => {
    const query = `
      query($find: FindScopeInput!) {
        scopeFind(find: $find) {
          name
        }
      }
    `;
    const variables = {
      find: { name: 0 },
    };
    const resultExpected = {
      errors: [
        {
          message:
            'Variable "$find" got invalid value 0 at "find.name"; String cannot represent a non string value: 0',
          locations: [{ line: 2, column: 13 }],
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        },
      ],
    };

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({ query, variables })
      .expect(400)
      .expect(resultExpected);
    // .then((value) => console.log(JSON.stringify(value.body), value.status))
  });

  afterAll(async () => {
    await app.close();
  });
});
