import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { Edge } from 'arangojs/documents';
import { GraphQLError } from 'graphql';
import {
  IFilterToAQL,
  ISortToAQL,
} from 'src/shared/interfaces/queries-resources.interface';
import { ArangodbService } from '../../../../arangodb/arangodb.service';
import { PaginationInput } from '../../../../shared/dto/pagination.input';
import { collectionsEnum } from '../../../../shared/enums/collections.enum';
import {
  FILTER_DEFAULT,
  PAGINATION_DEFAULT,
  SORT_DEFAULT,
} from '../../../../shared/queries.constant';
import { QueryParseService } from '../../../../shared/services/query-parse/query-parse.service';
import { UserHasRoleCreateDto } from '../../domain/dto/users-has-role/user-has-role-create.dto';
import { UserHasRoleUpdateDto } from '../../domain/dto/users-has-role/user-has-role-update.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UsersHasRoleRepository {
  private readonly name = collectionsEnum.USERS_HAS_ROLE;
  private readonly collections = [collectionsEnum.USERS, collectionsEnum.ROLES];

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly queryParseService: QueryParseService,
  ) {}

  async create(userHasRoleCreateDto: UserHasRoleCreateDto) {
    try {
      const cursor = await this.arangoService.query(aql`
        INSERT ${userHasRoleCreateDto} INTO ${this.arangoService.collection(
        this.name,
      )}
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async update(userHasRoleUpdateDto: UserHasRoleUpdateDto) {
    try {
      const collection = this.arangoService.collection(this.name);

      const cursor = await this.arangoService.query(aql`
        UPDATE ${userHasRoleUpdateDto} IN ${collection}
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async find(filters: IFilterToAQL[]): Promise<Edge | null> {
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

  async searchIn({
    parentId,
    filters = FILTER_DEFAULT,
    sort = SORT_DEFAULT,
    pagination = PAGINATION_DEFAULT,
  }: {
    parentId: string;
    filters?: IFilterToAQL[];
    sort?: ISortToAQL;
    pagination?: PaginationInput;
  }): Promise<User[]> {
    const collectionEdge = this.arangoService.collection(this.name);
    const collectionsVertex = this.collections.map((collection) =>
      this.arangoService.collection(collection),
    );

    try {
      const cursor = await this.arangoService.query(aql`
        WITH ${aql.join([collectionEdge, ...collectionsVertex])}
        FOR vertex, edge IN INBOUND ${parentId} ${collectionEdge}
        ${aql.join(this.queryParseService.filtersToAql(filters, 'vertex'))}
        ${aql.join(this.queryParseService.sortToAql(sort, 'vertex'))}
        ${this.queryParseService.paginationToAql(pagination)}
        RETURN vertex
      `);

      return await cursor.map((el) => el);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async searchOut({
    parentId,
    filters = FILTER_DEFAULT,
    sort = SORT_DEFAULT,
    pagination = PAGINATION_DEFAULT,
  }: {
    parentId: string;
    filters?: IFilterToAQL[];
    sort?: ISortToAQL;
    pagination?: PaginationInput;
  }): Promise<User[]> {
    const collectionEdge = this.arangoService.collection(this.name);
    const collectionsVertex = this.collections.map((collection) =>
      this.arangoService.collection(collection),
    );

    try {
      const cursor = await this.arangoService.query(aql`
        WITH ${aql.join([collectionEdge, ...collectionsVertex])}
        FOR vertex, edge IN OUTBOUND ${parentId} ${collectionEdge}
        ${aql.join(this.queryParseService.filtersToAql(filters, 'vertex'))}
        ${aql.join(this.queryParseService.sortToAql(sort, 'vertex'))}
        ${this.queryParseService.paginationToAql(pagination)}
        RETURN vertex
      `);

      return await cursor.map((el) => el);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }
}
