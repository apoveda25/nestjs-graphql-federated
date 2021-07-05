import { ICommand } from '@nestjs/cqrs';
import { DeleteScopeDto } from '../../../domain/dto/delete-scope.dto';

export class ScopesDeleteCommand implements ICommand {
  constructor(public readonly input: DeleteScopeDto[]) {}
}
