import * as faker from 'faker';
import { RemoveScopesRoleDto } from '../../domain/dto/remove-scopes-role.dto';
import { RemoveScopesRoleInput } from '../../domain/dto/remove-scopes-role.input';
import { RemoveScopesRolePipe } from './remove-scopes-role.pipe';

describe('RemoveScopesRolePipe', () => {
  it('should be defined', () => {
    expect(new RemoveScopesRolePipe()).toBeDefined();
  });

  it('should return a edge', () => {
    const _key = faker.datatype.uuid();
    const removeScopesRolePipe = new RemoveScopesRolePipe();
    const removeScopesRoleInput: RemoveScopesRoleInput = {
      roleId: `Roles/${_key}`,
      scopesId: [`Scopes/${_key}`],
    };
    const resultExpected: RemoveScopesRoleDto[] = [
      {
        _from: removeScopesRoleInput.roleId,
        _to: removeScopesRoleInput.scopesId[0],
      },
    ];

    const result = removeScopesRolePipe.transform(removeScopesRoleInput);

    expect(result).toEqual(resultExpected);
  });
});
