import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs';
import { Edge } from 'arangojs/documents';
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
import { Scope } from '../../../scopes/domain/entities/scope.entity';
import { CreateRoleHasScopeDto } from '../../domain/dto/roles-has-scope/create-role-has-scope.dto';
import { DeleteRoleHasScopeDto } from '../../domain/dto/roles-has-scope/delete-role-has-scope.dto';
import { Role } from '../../domain/entities/role.entity';

@Injectable()
export class RolesHasScopesRepository {
  private readonly name = collectionsEnum.ROLES_HAS_SCOPE;
  private readonly collections = [
    collectionsEnum.ROLES,
    collectionsEnum.SCOPES,
  ];

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly queryParseService: QueryParseService,
  ) {}

  async create(addScopesRoleDto: CreateRoleHasScopeDto[]) {
    try {
      const cursor = await this.arangoService.query(aql`
        FOR vertex IN ${addScopesRoleDto}
        INSERT vertex INTO ${this.arangoService.collection(this.name)}
        RETURN NEW
      `);

      return await cursor.map((doc) => doc);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async delete(removeScopesRoleDto: DeleteRoleHasScopeDto[]) {
    try {
      const cursor = await this.arangoService.query(aql`
        FOR edge IN ${this.arangoService.collection(this.name)}
          FOR doc IN ${removeScopesRoleDto}
          FILTER edge._from == doc._from && edge._to == doc._to
          REMOVE edge IN ${this.arangoService.collection(this.name)}
          RETURN OLD
      `);

      return await cursor.map((doc) => doc);
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

  async searchOutOrphans({
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
    const collectionEdge = this.arangoService.collection(this.name);
    const collectionsVertex = this.collections.map((collection) =>
      this.arangoService.collection(collection),
    );

    try {
      const cursor = await this.arangoService.query(aql`
        WITH ${aql.join([collectionEdge, ...collectionsVertex])}
        LET scopesId = (
          FOR vertex, edge IN OUTBOUND ${parentId} ${collectionEdge}
          RETURN vertex._id
        )
        FOR scope IN ${collectionsVertex[1]}
        FILTER scope._id NOT IN scopesId
        ${aql.join(this.queryParseService.filtersToAql(filters, 'scope'))}
        ${aql.join(this.queryParseService.sortToAql(sort, 'scope'))}
        ${this.queryParseService.paginationToAql(pagination)}
        RETURN scope
      `);

      return await cursor.map((el) => el);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }
}
