import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import { Role } from '../../roles/entities/role.entity';
import { AddRoleUserDto } from '../dto/add-role-user.dto';

@Injectable()
export class UsersHasRoleRepository {
  private readonly name = 'UsersHasRole';
  private readonly nameCollectionInput = 'Users';
  private readonly nameCollectionOutput = 'Roles';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
    private readonly inputTransform: InputTransform,
  ) {}

  async create(addRoleUserDto: AddRoleUserDto) {
    try {
      const cursor = await this.arangoService.query(aql`
        INSERT ${addRoleUserDto} INTO ${this.arangoService.collection(
        this.name,
      )}
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOut({ parentId }: { parentId: string }): Promise<Role> {
    const collections = [
      this.name,
      this.nameCollectionInput,
      this.nameCollectionOutput,
    ].map((collection) => this.arangoService.collection(collection));

    try {
      const cursor = await this.arangoService.query(aql`
        WITH ${aql.join(collections)}
        FOR vertex, edge IN OUTBOUND ${parentId} ${collections[0]}
        RETURN vertex
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
