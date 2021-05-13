import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { GraphQLError } from 'graphql';
import { ArangodbService } from '../../../../arangodb/arangodb.service';
import { ObjectToAQL } from '../../../../arangodb/providers/object-to-aql';
import { PaginationInput } from '../../../../shared/dto/pagination.input';
import { IEdge } from '../../../../shared/interfaces/edge.interface';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../../shared/interfaces/search-resources.interface';
import {
  FILTER_DEFAULT,
  PAGINATION_DEFAULT,
  SORT_DEFAULT,
} from '../../../../shared/queries.constant';
import { Role } from '../../../roles/domain/entities/role.entity';
import { User } from '../../../users/domain/entities/user.entity';
import { AddRoleUserDto } from '../../domain/dto/add-role-user.dto';
import { ChangeRoleUserDto } from '../../domain/dto/change-role-user.dto';

@Injectable()
export class UsersHasRoleRepository {
  private readonly name = 'UsersHasRole';
  private readonly nameCollectionInput = 'Users';
  private readonly nameCollectionOutput = 'Roles';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
  ) {}

  async create(addRoleUserDto: AddRoleUserDto) {
    try {
      const cursor = await this.arangoService.query(aql`
        INSERT ${addRoleUserDto} INTO ${this.arangoService.collection(
        this.name,
      )}
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async update(changeRoleUserDto: ChangeRoleUserDto) {
    try {
      const cursor = await this.arangoService.query(aql`
        UPDATE ${changeRoleUserDto} IN ${this.arangoService.collection(
        this.name,
      )}
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async findOut({ parentId }: { parentId: string }): Promise<Role> {
    const collections = [
      this.name,
      this.nameCollectionInput,
      this.nameCollectionOutput,
    ].map((collection) => this.arangoService.collection(collection));

    try {
      const cursor = await this.arangoService.query(aql`
        WITH ${aql.join(collections)}
        FOR vertex, edge IN OUTBOUND ${parentId} ${collections[0]}
        RETURN vertex
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }

  async findOutEdge({ parentId }: { parentId: string }): Promise<IEdge> {
    const collections = [
      this.name,
      this.nameCollectionInput,
      this.nameCollectionOutput,
    ].map((collection) => this.arangoService.collection(collection));

    try {
      const cursor = await this.arangoService.query(aql`
        WITH ${aql.join(collections)}
        FOR vertex, edge IN OUTBOUND ${parentId} ${collections[0]}
        RETURN edge
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
    const collections = [
      this.name,
      this.nameCollectionInput,
      this.nameCollectionOutput,
    ].map((collection) => this.arangoService.collection(collection));

    try {
      const cursor = await this.arangoService.query(aql`
        WITH ${aql.join(collections)}
        FOR vertex, edge IN INBOUND ${parentId} ${collections[0]}
        ${aql.join(this.objectToAQL.filtersToAql(filters, 'vertex'))}
        ${aql.join(this.objectToAQL.sortToAql(sort, 'vertex'))}
        ${this.objectToAQL.paginationToAql(pagination)}
        RETURN vertex
      `);

      return await cursor.map((el) => el);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }
}
