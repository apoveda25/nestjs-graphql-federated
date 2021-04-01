import { Injectable, OnModuleInit } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { DocumentCollection } from 'arangojs/collection';
import { IScope } from '../../../app/scopes/interfaces/scope.interfaces';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../arangodb/providers/object-to-aql.interface';
import { PaginationInput } from '../../../shared/dto/pagination.input';
import { CreateScopeDto } from '../dto/create-scope.dto';
import { Scope } from '../entities/scope.entity';
import { ICollection } from '../interfaces/scopes-command-handlers.interface';

@Injectable()
export class ScopesRepository implements OnModuleInit {
  private repository: DocumentCollection;

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
    private readonly inputTransform: InputTransform,
  ) {}

  onModuleInit(): void {
    this.repository = this.arangoService.collection(
      'Scopes',
    ) as DocumentCollection<Scope>;
  }

  async getCollections(): Promise<ICollection[]> {
    return await this.arangoService.collections(true);
  }

  async search({
    filters = [],
    sort = [],
    pagination = { offset: 0, count: 30 },
  }: {
    filters?: IFilterToAQL[];
    sort?: ISortToAQL[];
    pagination?: PaginationInput;
  }): Promise<Scope[]> {
    const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.repository}
      ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
      ${aql.join(this.objectToAQL.sortToAql(sort, 'doc'))}
      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN doc
    `);

    return await cursor.map((el) => el);
  }

  async findAnd(filters: IScope): Promise<Scope | null> {
    const _filters: IFilterToAQL[] = this.inputTransform.resourceToArray(
      filters,
      '==',
      'AND',
    );

    const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.repository}
      ${aql.join(this.objectToAQL.filtersToAql(_filters, 'doc'))}
      RETURN doc
    `);

    return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
  }

  async findOr(filters: IScope): Promise<Scope> {
    const _filters: IFilterToAQL[] = this.inputTransform.resourceToArray(
      filters,
      '==',
      'OR',
    );

    const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.repository}
      ${aql.join(this.objectToAQL.filtersToAql(_filters, 'doc'))}
      RETURN doc
    `);

    return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
  }

  async create(createScopeDto: CreateScopeDto[]): Promise<Scope[]> {
    const results = await this.repository.saveAll(createScopeDto, {
      returnNew: true,
    });

    return results.map((result) => result.new);
  }
}
