import { ICommand } from '@nestjs/cqrs';
import { CreateRoleDto } from '../../../domain/dto/create-role.dto';

export class RoleCreateCommand implements ICommand {
  constructor(public readonly role: CreateRoleDto) {}
}
