import { IQuery } from '@nestjs/cqrs';
import { FindUserInput } from '../../../domain/dto/find-user.input';

export class UserFindQuery implements IQuery {
  constructor(public readonly input: FindUserInput) {}
}
