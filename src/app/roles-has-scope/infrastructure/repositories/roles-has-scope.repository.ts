import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs';
import { Edge } from 'arangojs/documents';
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
import { Role } from '../../../roles/domain/entities/role.entity';
import { Scope } from '../../../scopes/domain/entities/scope.entity';
import { AddScopesRoleDto } from '../../domain/dto/add-scopes-role.dto';
import { RemoveScopesRoleDto } from '../../domain/dto/remove-scopes-role.dto';

@Injectable()
export class RolesHasScopeRepository {
  private readonly name = 'RolesHasScope';
  private readonly nameCollectionInput = 'Roles';
  private readonly nameCollectionOutput = 'Scopes';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly queryParseService: QueryParseService,
  ) {}

  async create(addScopesRoleDto: AddScopesRoleDto[]) {
    try {
      const cursor = await this.arangoService.query(aql`
      FOR vertex IN ${addScopesRoleDto}
      INSERT vertex INTO ${this.arangoService.collection(this.name)}
    `);

      return await cursor.map((doc) => doc);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async delete(removeScopesRoleDto: RemoveScopesRoleDto[]) {
    try {
      const cursor = await this.arangoService.query(aql`
      FOR edge IN ${this.arangoService.collection(this.name)}
        FOR doc IN ${removeScopesRoleDto}
        FILTER edge._from == doc._from && edge._to == doc._to
        REMOVE edge IN ${this.arangoService.collection(this.name)}
    `);

      return await cursor.map((doc) => doc);
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
  }): Promise<Scope[]> {
    const collections = [
      this.name,
      this.nameCollectionInput,
      this.nameCollectionOutput,
    ].map((collection) => this.arangoService.collection(collection));

    try {
      const cursor = await this.arangoService.query(aql`
      WITH ${aql.join(collections)}
      FOR vertex, edge IN OUTBOUND ${parentId} ${collections[0]}
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
  }): Promise<Role[]> {
    const collections = [
      this.name,
      this.nameCollectionInput,
      this.nameCollectionOutput,
    ].map((collection) => this.arangoService.collection(collection));

    try {
      const cursor = await this.arangoService.query(aql`
      WITH ${aql.join(collections)}
      FOR vertex, edge IN INBOUND ${parentId} ${collections[0]}
      ${aql.join(this.queryParseService.filtersToAql(filters, 'doc'))}
      ${aql.join(this.queryParseService.sortToAql(sort, 'doc'))}
      ${this.queryParseService.paginationToAql(pagination)}
      RETURN vertex
    `);

      return await cursor.map((el) => el);
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
}
