import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { ArangodbService } from '../../../../arangodb/arangodb.service';
import { InputTransform } from '../../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../../arangodb/providers/object-to-aql';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../../arangodb/providers/object-to-aql.interface';
import { PaginationInput } from '../../../../shared/dto/pagination.input';
import {
  FILTER_DEFAULT,
  PAGINATION_DEFAULT,
  SORT_DEFAULT,
} from '../../../../shared/queries.constant';
import { CreateScopeDto } from '../../domain/dto/create-scope.dto';
import { Scope } from '../../domain/entities/scope.entity';
import { ICollection, IScope } from '../../domain/interfaces/scope.interfaces';

@Injectable()
export class ScopesRepository {
  readonly name = 'Scopes';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
    private readonly inputTransform: InputTransform,
  ) {}

  async getCollections(): Promise<ICollection[]> {
    return await this.arangoService.collections(true);
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
      throw new InternalServerErrorException();
    }
  }

  async findAnd(filters: IScope): Promise<Scope | null> {
    const _filters: IFilterToAQL[] = this.inputTransform.resourceToArray(
      filters,
      '==',
      'AND',
    );

    try {
      const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.objectToAQL.filtersToAql(_filters, 'doc'))}
      RETURN doc
    `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOr(filters: IScope): Promise<Scope | null> {
    const _filters: IFilterToAQL[] = this.inputTransform.resourceToArray(
      filters,
      '==',
      'OR',
    );

    try {
      const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.objectToAQL.filtersToAql(_filters, 'doc'))}
      RETURN doc
    `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
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
        ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
        RETURN doc
      )
    `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, 0);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async search({
    filters = FILTER_DEFAULT,
    sort = SORT_DEFAULT,
    pagination = PAGINATION_DEFAULT,
  }: {
    filters?: IFilterToAQL[];
    sort?: ISortToAQL[];
    pagination?: PaginationInput;
  }): Promise<Scope[]> {
    try {
      const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
      ${aql.join(this.objectToAQL.sortToAql(sort, 'doc'))}
      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN doc
    `);

      return await cursor.map((doc) => doc);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
