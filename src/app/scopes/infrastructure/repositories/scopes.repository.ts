import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { GraphQLError } from 'graphql';
import { ArangodbService } from '../../../../arangodb/arangodb.service';
import { PaginationInput } from '../../../../shared/dto/pagination.input';
import { collectionsEnum } from '../../../../shared/enums/collections.enum';
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
import { CreateScopeDto } from '../../domain/dto/create-scope.dto';
import { DeleteScopeDto } from '../../domain/dto/delete-scope.dto';
import { Scope } from '../../domain/entities/scope.entity';
import { ICollection } from '../../domain/interfaces/scope.interfaces';

@Injectable()
export class ScopesRepository {
  private readonly name = collectionsEnum.SCOPES;
  private readonly RolesHasScope = collectionsEnum.ROLES_HAS_SCOPE;

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly queryParseService: QueryParseService,
  ) {}

  async getCollections(): Promise<ICollection[]> {
    return await this.arangoService.listCollections(true);
  }

  async create(createScopeDto: CreateScopeDto[]): Promise<Scope[]> {
    try {
      const cursor = await this.arangoService.query(aql`
        FOR doc IN ${createScopeDto}
        INSERT doc INTO ${this.arangoService.collection(this.name)}
        OPTIONS { waitForSync: true }
        RETURN doc
      `);

      return await cursor.map((doc) => doc);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async delete(deleteScopeDto: DeleteScopeDto[]): Promise<Scope[]> {
    try {
      const cursor = await this.arangoService.query(aql`
        FOR doc IN ${deleteScopeDto}
        REMOVE doc IN ${this.arangoService.collection(this.name)}
        RETURN OLD
      `);

      return await cursor.map((doc) => doc);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async find(filters: IFilterToAQL[]): Promise<Scope | null> {
    try {
      const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.queryParseService.filtersToAql(filters, 'doc'))}
      RETURN doc
    `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async count({
    filters = FILTER_DEFAULT,
  }: {
    filters?: IFilterToAQL[];
  }): Promise<number> {
    try {
      const cursor = await this.arangoService.query(aql`
      RETURN COUNT (
        FOR doc IN ${this.arangoService.collection(this.name)}
        ${aql.join(this.queryParseService.filtersToAql(filters, 'doc'))}
        RETURN doc
      )
    `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, 0);
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
  }): Promise<Scope[]> {
    try {
      const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.queryParseService.filtersToAql(filters, 'doc'))}
      ${aql.join(this.queryParseService.sortToAql(sort, 'doc'))}
      ${this.queryParseService.paginationToAql(pagination)}
      RETURN doc
    `);

      return await cursor.map((doc) => doc);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }
}
