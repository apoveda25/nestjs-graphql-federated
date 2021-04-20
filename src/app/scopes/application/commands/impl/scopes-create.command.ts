import { ICommand } from '@nestjs/cqrs';

export class ScopesCreateCommand implements ICommand {
  constructor(public readonly createdBy: string) {}
}
