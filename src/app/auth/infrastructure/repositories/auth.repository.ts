import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { aql } from 'arangojs';
import { ArangodbService } from '../../../../arangodb/arangodb.service';
import { InputTransform } from '../../../../arangodb/providers/input-transform';
import { ObjectToAQL } from '../../../../arangodb/providers/object-to-aql';
import { User } from '../../../users/domain/entities/user.entity';

@Injectable()
export class AuthRepository {
  private readonly name = 'Users';
  private readonly nameEdge = 'UsersHasRole';

  constructor(
    private readonly arangoService: ArangodbService,
    private readonly objectToAQL: ObjectToAQL,
    private readonly inputTransform: InputTransform,
  ) {}

  async signUp(user: User, hasRole: Record<string, any>) {
    try {
      const cursor = await this.arangoService.query(aql`
        INSERT ${user} INTO ${this.arangoService.collection(this.name)}
        INSERT ${hasRole} INTO ${this.arangoService.collection(this.nameEdge)}
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
