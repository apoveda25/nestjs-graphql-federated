import * as faker from 'faker';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { AddScopesRoleDto } from '../dto/add-scopes-role.dto';
import { AddScopesRoleInput } from '../dto/add-scopes-role.input';
import { AddScopesRolePipe } from './add-scopes-role.pipe';

describe('AddScopesRolePipe', () => {
  it('should be defined', () => {
    expect(
      new AddScopesRolePipe({ user: { _id: '', roleId: '' } }),
    ).toBeDefined();
  });

  it('should return a role', () => {
    const _key = faker.datatype.uuid();
    const createdAt = Date.now();
    const context: IContextGraphQL = {
      user: {
        _id: `Users/${_key}`,
        roleId: `Roles/${faker.datatype.uuid()}`,
      },
    };
    const addScopesRolePipe = new AddScopesRolePipe(context);
    const addScopesRoleInput: AddScopesRoleInput = {
      roleId: `Roles/${_key}`,
      scopesId: [`Scopes/${_key}`],
    };
    const resultExpected: AddScopesRoleDto[] = [
      {
        _from: addScopesRoleInput.roleId,
        _to: addScopesRoleInput.scopesId[0],
        createdAt,
        createdBy: context.user._id,
      },
    ];

    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(createdAt);

    const result = addScopesRolePipe.transform(addScopesRoleInput);

    expect(dateNowSpy).toBeCalled();
    expect(result).toEqual(resultExpected);
  });
});
