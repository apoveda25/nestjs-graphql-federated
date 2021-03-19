import { Injectable, OnModuleInit } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { DocumentCollection } from 'arangojs/collection';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../arangodb/providers/object-to-aql.interface';
import { PaginationInput } from '../../../shared/dto/pagination.input';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesRepository implements OnModuleInit {
  private repository: DocumentCollection;

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
  ) {}

  onModuleInit(): void {
    this.repository = this.arangoService.collection(
      'Roles',
    ) as DocumentCollection<Role>;
  }

  async create(createRolesDto: CreateRoleDto[]) {
    return await this.repository.saveAll(createRolesDto, { returnNew: true });
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

  async find(_id: string): Promise<Role> {
    const cursor = await this.arangoService.query(aql`
      FOR doc IN ${this.repository}
      FILTER doc._key == ${_id} || doc._id == ${_id}
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
