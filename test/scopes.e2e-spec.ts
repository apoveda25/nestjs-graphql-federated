import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Scopes (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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
  });

  it('Mutation scopesSearch (Ok)', () => {
    const query = `
      query($filters: FilterScopeInput) {
        scopesSearch(filters: $filters) {
          name
        }
      }
    `;
    const variables = {
      filters: {
        name: [{ value: 'scopes_search', operator: 'EQUAL' }],
        separator: 'AND',
      },
    };
    const resultExpected = {
      data: {
        scopesSearch: [
          {
            name: 'scopes_search',
          },
        ],
      },
    };

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({ query, variables })
      .expect(200)
      .expect(resultExpected);
  });

  it('Mutation scopesSearch (Not Found)', () => {
    const query = `
      query($filters: FilterScopeInput) {
        scopesSearch(filters: $filters) {
          name
        }
      }
    `;
    const variables = {
      filters: {
        name: [{ value: 'scopes_searc', operator: 'EQUAL' }],
        separator: 'AND',
      },
    };
    const resultExpected = { data: { scopesSearch: [] } };

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({ query, variables })
      .expect(200)
      .expect(resultExpected);
  });

  it('Mutation scopesSearch (Bad Request)', () => {
    const query = `
      query($filters: FilterScopeInput) {
        scopesSearch(filters: $filters) {
          name
        }
      }
    `;
    const variables = {
      filters: {
        name: [{ value: 'scopes_search', operator: 'EQUA' }],
        separator: 'AND',
      },
    };
    const resultExpected = {
      errors: [
        {
          message:
            'Variable "$filters" got invalid value "EQUA" at "filters.name[0].operator"; Value "EQUA" does not exist in "ComparisonOperatorString" enum. Did you mean the enum value "EQUAL"?',
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
  });

  it('Mutation scopesCount (Ok)', () => {
    const query = `
      query($filters: FilterScopeInput) {
        scopesCount(filters: $filters)
      }
    `;
    const variables = {
      filters: {
        name: [{ value: 'scopes_count', operator: 'EQUAL' }],
        separator: 'AND',
      },
    };
    const resultExpected = { data: { scopesCount: 1 } };

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({ query, variables })
      .expect(200)
      .expect(resultExpected);
  });

  it('Mutation scopesCount (Not Found)', () => {
    const query = `
      query($filters: FilterScopeInput) {
        scopesCount(filters: $filters)
      }
    `;
    const variables = {
      filters: {
        name: [{ value: 'scopes_coun', operator: 'EQUAL' }],
        separator: 'AND',
      },
    };
    const resultExpected = { data: { scopesCount: 0 } };

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Accept', 'application/json')
      .send({ query, variables })
      .expect(200)
      .expect(resultExpected);
  });

  it('Mutation scopesCount (Bad Request)', () => {
    const query = `
      query($filters: FilterScopeInput) {
        scopesCount(filters: $filters)
      }
    `;
    const variables = {
      filters: {
        name: [{ value: 'scopes_count', operator: 'EQUA' }],
        separator: 'AND',
      },
    };
    const resultExpected = {
      errors: [
        {
          message:
            'Variable "$filters" got invalid value "EQUA" at "filters.name[0].operator"; Value "EQUA" does not exist in "ComparisonOperatorString" enum. Did you mean the enum value "EQUAL"?',
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
  });

  afterAll(async () => {
    await app.close();
  });
});
