import { IQuery } from '@nestjs/cqrs';

export class UserHasRoleOutQuery implements IQuery {
  constructor(public readonly input: { parentId: string }) {}
}
