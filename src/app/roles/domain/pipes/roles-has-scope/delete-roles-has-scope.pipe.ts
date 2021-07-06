import { Injectable, PipeTransform } from '@nestjs/common';
import { DeleteRoleHasScopeDto } from '../../dto/roles-has-scope/delete-role-has-scope.dto';
import { DeleteRoleHasScopeInput } from '../../dto/roles-has-scope/delete-role-has-scope.input';

@Injectable()
export class DeleteRolesHasScopePipe implements PipeTransform {
  transform(value: DeleteRoleHasScopeInput): DeleteRoleHasScopeDto[] {
    return value.scopesId.map((scopeId) => ({
      _from: value.roleId,
      _to: scopeId,
    }));
  }
}
