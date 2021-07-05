import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs';
import { GraphQLError } from 'graphql';
import { ArangodbService } from '../../../../arangodb/arangodb.service';
import { PaginationInput } from '../../../../shared/dto/pagination.input';
import { collectionsEnum } from '../../../../shared/enums/collections.enum';
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
import { Role } from '../../../roles/domain/entities/role.entity';

@Injectable()
export class RolesHasScopesRepository {
  private readonly name = collectionsEnum.ROLES_HAS_SCOPE;
  private readonly collections = [
    collectionsEnum.ROLES,
    collectionsEnum.SCOPES,
  ];

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly queryParseService: QueryParseService,
  ) {}

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
  }): Promise<Role[]> {
    const collectionEdge = this.arangoService.collection(this.name);
    const collectionsVertex = this.collections.map((collection) =>
      this.arangoService.collection(collection),
    );

    try {
      const cursor = await this.arangoService.query(aql`
        WITH ${aql.join([collectionEdge, ...collectionsVertex])}
        FOR vertex, edge IN INBOUND ${parentId} ${collectionEdge}
        ${aql.join(this.queryParseService.filtersToAql(filters, 'vertex'))}
        ${aql.join(this.queryParseService.sortToAql(sort, 'vertex'))}
        ${this.queryParseService.paginationToAql(pagination)}
        RETURN vertex
      `);

      return await cursor.map((el) => el);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }
}
