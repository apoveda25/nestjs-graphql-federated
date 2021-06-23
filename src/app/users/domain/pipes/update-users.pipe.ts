import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserInput } from '../dto/update-user.input';

@Injectable({ scope: Scope.REQUEST })
export class UpdateUsersPipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private context: IContextGraphQL) {}

  transform(users: UpdateUserInput[]): UpdateUserDto[] {
    return users.map((user) => ({
      _id: `Users/${user._key}`,
      ...user,
      updatedBy: this.context.user._id,
      updatedAt: Date.now(),
    }));
  }
}
