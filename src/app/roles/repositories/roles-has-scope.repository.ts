import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../arangodb/providers/object-to-aql.interface';
import { PaginationInput } from '../../../shared/dto/pagination.input';
import { Scope } from '../../scopes/entities/scope.entity';

@Injectable()
export class RolesHasScopeRepository {
  private readonly name = 'RolesHasScope';
  private readonly nameCollectionInput = 'Roles';
  private readonly nameCollectionOutput = 'Scopes';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
  ) {}

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

    const cursor = await this.arangoService.query(aql`
      WITH ${aql.join(collections)}
      FOR vertex, edge IN OUTBOUND ${parentId} ${collections[0]}
      ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
      ${aql.join(this.objectToAQL.sortToAql(sort, 'doc'))}
      ${this.objectToAQL.paginationToAql(pagination)}
      RETURN vertex
    `);

    return await cursor.map((el) => el);
  }
}
