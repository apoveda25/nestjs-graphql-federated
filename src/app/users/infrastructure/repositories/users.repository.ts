import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { GraphQLError } from 'graphql';
import { ArangodbService } from '../../../../arangodb/arangodb.service';
import { PaginationInput } from '../../../../shared/dto/pagination.input';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../../shared/interfaces/queries-resources.interface';
import {
  FILTER_DEFAULT,
  PAGINATION_DEFAULT,
  SORT_DEFAULT,
} from '../../../../shared/queries.constant';
import { QueryParseService } from '../../../../shared/services/query-parse/query-parse.service';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UsersRepository {
  private readonly name = 'Users';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly queryParseService: QueryParseService,
  ) {}

  async create(user: User) {
    try {
      const cursor = await this.arangoService.query(aql`
        INSERT ${user} INTO ${this.arangoService.collection(this.name)}
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async update(users: User[]) {
    try {
      const cursor = await this.arangoService.query(aql`
        FOR doc IN ${users}
        UPDATE doc IN ${this.arangoService.collection(this.name)}
      `);

      return await cursor.map((user) => user);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async find(filters: IFilterToAQL[]): Promise<User | null> {
    try {
      const cursor = await this.arangoService.query(aql`
        FOR doc IN ${this.arangoService.collection(this.name)}
        ${aql.join(this.queryParseService.filtersToAql(filters, 'doc'))}
        LIMIT 1
        RETURN doc
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async search({
    filters = FILTER_DEFAULT,
    sort = SORT_DEFAULT,
    pagination = PAGINATION_DEFAULT,
  }: {
    filters?: IFilterToAQL[];
    sort?: ISortToAQL;
    pagination?: PaginationInput;
  }): Promise<User[]> {
    const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.queryParseService.filtersToAql(filters, 'doc'))}
      ${aql.join(this.queryParseService.sortToAql(sort, 'doc'))}
      ${this.queryParseService.paginationToAql(pagination)}
      RETURN doc
    `);

    return await cursor.map((el) => el);
  }

  async count({
    filters = FILTER_DEFAULT,
  }: {
    filters?: IFilterToAQL[];
  }): Promise<number> {
    const cursor = await this.arangoService.query(aql`
      RETURN COUNT(
        FOR doc IN ${this.arangoService.collection(this.name)}
        ${aql.join(this.queryParseService.filtersToAql(filters, 'doc'))}
        RETURN doc
      )
    `);

    return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  }
}
