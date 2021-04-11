import { IQuery } from '@nestjs/cqrs';

export class UserHasRoleSearchOutQuery implements IQuery {
  constructor(public readonly input: { parentId: string }) {}
}
