import { Inject, Injectable, PipeTransform } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { UpdateUserInput } from '../../domain/dto/update-user.input';

@Injectable()
export class UpdateUsersPipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

  transform(users: UpdateUserInput[]): UpdateUserDto[] {
    return users.map((user) => ({
      _id: `Users/${user._key}`,
      ...user,
      updatedBy: this.context.user._id,
      updatedAt: Date.now(),
    }));
  }
}
