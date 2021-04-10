import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import {
  IFilterToAQL,
  ISortToAQL,
} from '../../../arangodb/providers/object-to-aql.interface';
import { PaginationInput } from '../../../shared/dto/pagination.input';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class UsersHasRoleRepository {
  private readonly name = 'UsersHasRole';
  private readonly nameCollectionInput = 'Users';
  private readonly nameCollectionOutput = 'Roles';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
  ) {}

  async searchIn({
    filters,
    sort,
    pagination,
    parentId,
  }: {
    filters: IFilterToAQL[];
    sort: ISortToAQL[];
    pagination: PaginationInput;
    parentId: string;
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
      throw new InternalServerErrorException();
    }
  }
}
