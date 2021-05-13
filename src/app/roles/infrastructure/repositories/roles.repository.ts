import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { GraphQLError } from 'graphql';
import { ArangodbService } from '../../../../arangodb/arangodb.service';
import { PaginationInput } from '../../../../shared/dto/pagination.input';
import {
  IEdge,
  IEdgeSearchInput,
} from '../../../../shared/interfaces/edge.interface';
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
import { CreateRoleDto } from '../../domain/dto/create-role.dto';
import { DeleteRoleDto } from '../../domain/dto/delete-role.dto';
import { UpdateRoleDto } from '../../domain/dto/update-role.dto';
import { Role } from '../../domain/entities/role.entity';

@Injectable()
export class RolesRepository {
  private readonly name = 'Roles';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly queryParseService: QueryParseService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const cursor = await this.arangoService.query(aql`
      INSERT ${createRoleDto} INTO ${this.arangoService.collection(this.name)}
    `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async update(updateRoleDto: UpdateRoleDto[]) {
    try {
      const cursor = await this.arangoService.query(aql`
      FOR doc IN ${updateRoleDto}
      UPDATE doc IN ${this.arangoService.collection(this.name)}
    `);

      return await cursor.map((doc) => doc);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async delete(deleteRoleDto: DeleteRoleDto[]) {
    try {
      const cursor = await this.arangoService.query(aql`
      FOR doc IN ${deleteRoleDto}
      REMOVE doc IN ${this.arangoService.collection(this.name)}
    `);

      return await cursor.map((doc) => doc);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async find(filters: IFilterToAQL[]): Promise<Role | null> {
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
  }): Promise<Role[]> {
    try {
      const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.queryParseService.filtersToAql(filters, 'doc'))}
      ${aql.join(this.queryParseService.sortToAql(sort, 'doc'))}
      ${this.queryParseService.paginationToAql(pagination)}
      RETURN doc
    `);

      return await cursor.map((el) => el);
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
      RETURN COUNT(
        FOR doc IN ${this.arangoService.collection(this.name)}
        ${aql.join(this.queryParseService.filtersToAql(filters, 'doc'))}
        RETURN doc
      )
    `);

      return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async searchEdgeConnections({
    collections,
    direction,
    startVertexId,
  }: IEdgeSearchInput): Promise<IEdge[]> {
    const _collections = collections.map((collection) =>
      this.arangoService.collection(collection),
    );

    try {
      const cursor = await this.arangoService.query(aql`
        WITH ${aql.join(_collections, ', ')}
        FOR vertex, edge IN ${direction} ${startVertexId} ${aql.join(
        _collections,
      )}
        RETURN edge
      `);

      return await cursor.map((el) => el);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }
}
