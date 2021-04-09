import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { aql } from 'arangojs';
import { Edge } from 'arangojs/documents';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../arangodb/providers/object-to-aql.interface';
import { PaginationInput } from '../../../shared/dto/pagination.input';
import { IEdgeFilter } from '../../../shared/interfaces/edge.interface';
import { Scope } from '../../scopes/entities/scope.entity';
import { AddScopesRoleDto } from '../dto/add-scopes-role.dto';
import { RemoveScopesRoleDto } from '../dto/remove-scopes-role.dto';

@Injectable()
export class RolesHasScopeRepository {
  private readonly name = 'RolesHasScope';
  private readonly nameCollectionInput = 'Roles';
  private readonly nameCollectionOutput = 'Scopes';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
    private readonly inputTransform: InputTransform,
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
      throw new InternalServerErrorException();
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
      throw new InternalServerErrorException();
    }
  }

  async searchOut({
    filters,
    sort,
    pagination,
    parentId,
  }: {
    filters: IFilterToAQL[];
    sort: ISortToAQL[];
    pagination: PaginationInput;
    parentId: string;
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
      ${aql.join(this.objectToAQL.filtersToAql(filters, 'vertex'))}
      ${aql.join(this.objectToAQL.sortToAql(sort, 'vertex'))}
      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN vertex
    `);

      return await cursor.map((el) => el);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAnd(filters: IEdgeFilter): Promise<Edge | null> {
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
}
