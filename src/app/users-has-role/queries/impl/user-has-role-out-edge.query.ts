import { IQuery } from '@nestjs/cqrs';

export class UserHasRoleOutEdgeQuery implements IQuery {
  constructor(public readonly input: { parentId: string }) {}
}
