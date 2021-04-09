import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../arangodb/providers/object-to-aql.interface';
import { PaginationInput } from '../../../shared/dto/pagination.input';
import {
  IEdge,
  IEdgeSearchInput,
} from '../../../shared/interfaces/edge.interface';
import { CreateRoleDto } from '../dto/create-role.dto';
import { DeleteRoleDto } from '../dto/delete-role.dto';
import { FindRoleInput } from '../dto/find-role.input';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesRepository {
  private readonly name = 'Roles';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
    private readonly inputTransform: InputTransform,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const cursor = await this.arangoService.query(aql`
      INSERT ${createRoleDto} INTO ${this.arangoService.collection(this.name)}
    `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
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
      throw new InternalServerErrorException();
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
      throw new InternalServerErrorException();
    }
  }

  async findAnd(filters: FindRoleInput): Promise<Role | null> {
    const _filters: IFilterToAQL[] = this.inputTransform.resourceToArray(
      filters,
      '==',
      'AND',
    );

    try {
      const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.objectToAQL.filtersToAql(_filters, 'doc'))}
      LIMIT 1
      RETURN doc
    `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOr(filters: FindRoleInput): Promise<Role | null> {
    const _filters: IFilterToAQL[] = this.inputTransform.resourceToArray(
      filters,
      '==',
      'OR',
    );

    try {
      const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.objectToAQL.filtersToAql(_filters, 'doc'))}
      LIMIT 1
      RETURN doc
    `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async search({
    filters,
    sort,
    pagination,
  }: {
    filters: IFilterToAQL[];
    sort: ISortToAQL[];
    pagination: PaginationInput;
  }): Promise<Role[]> {
    try {
      const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
      ${aql.join(this.objectToAQL.sortToAql(sort, 'doc'))}
      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN doc
    `);

      return await cursor.map((el) => el);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async count(filters: IFilterToAQL[]): Promise<number> {
    try {
      const cursor = await this.arangoService.query(aql`
      RETURN COUNT(
        FOR doc IN ${this.arangoService.collection(this.name)}
        ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
        RETURN doc
      )
    `);

      return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
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
      throw new InternalServerErrorException();
    }
  }
}
