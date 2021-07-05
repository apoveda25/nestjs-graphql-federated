import { ICommand } from '@nestjs/cqrs';

export class ScopesInitCommand implements ICommand {
  constructor(public readonly createdBy: string) {}
}
