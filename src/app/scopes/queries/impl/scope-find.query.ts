import { IQuery } from '@nestjs/cqrs';
import { FindScopeInput } from '../../dto/find-scope.input';

export class ScopeFindQuery implements IQuery {
  constructor(public readonly input: FindScopeInput) {}
}
