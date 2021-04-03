import { Injectable, OnModuleInit } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { DocumentCollection } from 'arangojs/collection';
import { IRole } from '../../../app/roles/interfaces/role.interfaces';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../arangodb/providers/object-to-aql.interface';
import { PaginationInput } from '../../../shared/dto/pagination.input';
import { CreateRoleInput } from '../dto/create-role.input';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesRepository implements OnModuleInit {
  readonly name = 'Roles';
  private repository: DocumentCollection;

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
    private readonly inputTransform: InputTransform,
  ) {}

  onModuleInit(): void {
    this.repository = this.arangoService.collection(
      'Roles',
    ) as DocumentCollection<Role>;
  }

  async create(createRoleInput: CreateRoleInput) {
    const cursor = await this.arangoService.query(aql`
      INSERT ${createRoleInput} INTO ${this.arangoService.collection(this.name)}
    `);

    return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
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
    const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.repository}
      ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
      ${aql.join(this.objectToAQL.sortToAql(sort, 'doc'))}
      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN doc
    `);

    return await cursor.map((el) => el);
  }

  async findAnd(filters: IRole): Promise<Role | null> {
    const _filters: IFilterToAQL[] = this.inputTransform.resourceToArray(
      filters,
      '==',
      'AND',
    );

    const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.objectToAQL.filtersToAql(_filters, 'doc'))}
      RETURN doc
    `);

    return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
  }

  async findOr(filters: IRole): Promise<Role | null> {
    const _filters: IFilterToAQL[] = this.inputTransform.resourceToArray(
      filters,
      '==',
      'OR',
    );

    const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.arangoService.collection(this.name)}
      ${aql.join(this.objectToAQL.filtersToAql(_filters, 'doc'))}
      RETURN doc
    `);

    return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
  }

  async count(filters: IFilterToAQL[]): Promise<number> {
    const cursor = await this.arangoService.query(aql`
      RETURN COUNT(
        FOR doc IN ${this.repository}
        ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
        RETURN doc
      )
    `);

    return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  }
}
