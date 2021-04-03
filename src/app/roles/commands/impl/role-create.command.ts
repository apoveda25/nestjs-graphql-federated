import { ICommand } from '@nestjs/cqrs';
import { CreateRoleInput } from '../../dto/create-role.input';

export class RoleCreateCommand implements ICommand {
  constructor(public readonly role: CreateRoleInput) {}
}
