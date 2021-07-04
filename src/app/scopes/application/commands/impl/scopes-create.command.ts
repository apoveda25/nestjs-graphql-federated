import { ICommand } from '@nestjs/cqrs';
import { CreateScopeDto } from '../../../domain/dto/create-scope.dto';

export class ScopesCreateCommand implements ICommand {
  constructor(public readonly input: CreateScopeDto[]) {}
}
