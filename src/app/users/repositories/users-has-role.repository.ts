import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { aql } from 'arangojs/aql';
import { ArangodbService } from '../../../arangodb/arangodb.service';
import { InputTransform } from '../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../arangodb/providers/object-to-aql';
import { AddRoleUserDto } from '../dto/add-role-user.dto';

@Injectable()
export class UsersHasRoleRepository {
  private readonly name = 'UsersHasRole';

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
}
