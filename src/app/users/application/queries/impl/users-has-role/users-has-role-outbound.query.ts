import { IQuery } from '@nestjs/cqrs';

export class UsersHasRoleOutboundQuery implements IQuery {
  constructor(public readonly input: { parentId: string }) {}
}
