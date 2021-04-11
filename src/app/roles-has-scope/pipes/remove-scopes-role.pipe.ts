import { Injectable, PipeTransform } from '@nestjs/common';
import { RemoveScopesRoleDto } from '../dto/remove-scopes-role.dto';
import { RemoveScopesRoleInput } from '../dto/remove-scopes-role.input';

@Injectable()
export class RemoveScopesRolePipe implements PipeTransform {
  transform(value: RemoveScopesRoleInput): RemoveScopesRoleDto[] {
    return value.scopesId.map((scopeId) => ({
      _from: value.roleId,
      _to: scopeId,
    }));
  }
}
