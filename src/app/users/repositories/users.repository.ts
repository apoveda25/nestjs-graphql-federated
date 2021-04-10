import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import { IFilterToAQL } from '../../../arangodb/providers/object-to-aql.interface';
import { CreateUserDao } from '../dto/create-user.dao';
import { FindUserInput } from '../dto/find-role.input';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  private readonly name = 'Users';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
    private readonly inputTransform: InputTransform,
  ) {}

  async create(createUserDao: CreateUserDao) {
    try {
      const cursor = await this.arangoService.query(aql`
        INSERT ${createUserDao} INTO ${this.arangoService.collection(this.name)}
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async update(users: User[]) {
    try {
      const cursor = await this.arangoService.query(aql`
        FOR doc IN ${users}
        UPDATE doc IN ${this.arangoService.collection(this.name)}
      `);

      return await cursor.map((user) => user);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOr(filters: FindUserInput): Promise<User | null> {
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

  // async search({
  //   filters,
  //   sort,
  //   pagination,
  // }: {
  //   filters: IFilterToAQL[];
  //   sort: ISortToAQL[];
  //   pagination: PaginationInput;
  // }): Promise<User[]> {
  //   const cursor = await this.arangoService.query(aql`
  //     FOR doc IN ${this.repository}
  //     ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
  //     ${aql.join(this.objectToAQL.sortToAql(sort, 'doc'))}
  //     ${this.objectToAQL.paginationToAql(pagination)}
  //     RETURN doc
  //   `);

  //   return await cursor.map((el) => el);
  // }

  // async find(_id: string): Promise<User> {
  //   const cursor = await this.arangoService.query(aql`
  //     FOR doc IN ${this.repository}
  //     FILTER doc._key == ${_id} || doc._id == ${_id}
  //     RETURN doc
  //   `);

  //   return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
  // }

  // async count(filters: IFilterToAQL[]): Promise<number> {
  //   const cursor = await this.arangoService.query(aql`
  //     RETURN COUNT(
  //       FOR doc IN ${this.repository}
  //       ${aql.join(this.objectToAQL.filtersToAql(filters, 'doc'))}
  //       RETURN doc
  //     )
  //   `);

  //   return await cursor.reduce((acc: number, cur: number) => acc + cur, 0);
  // }
}
