import { Injectable } from '@nestjs/common';
import { aql } from 'arangojs';
import { GraphQLError } from 'graphql';
import { ArangodbService } from '../../../../arangodb/arangodb.service';
import { User } from '../../../users/domain/entities/user.entity';

@Injectable()
export class AuthRepository {
  private readonly name = 'Users';
  private readonly nameEdge = 'UsersHasRole';

  constructor(private readonly arangoService: ArangodbService) {}

  async signUp(user: User, hasRole: Record<string, any>) {
    try {
      const cursor = await this.arangoService.query(aql`
        INSERT ${user} INTO ${this.arangoService.collection(this.name)}
        INSERT ${hasRole} INTO ${this.arangoService.collection(this.nameEdge)}
      `);

      return await cursor.reduce((acc: any, cur: any) => cur || acc, null);
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }
}
