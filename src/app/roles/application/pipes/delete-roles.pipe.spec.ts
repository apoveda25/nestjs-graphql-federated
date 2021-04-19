import * as faker from 'faker';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { DeleteRoleDto } from '../../domain/dto/delete-role.dto';
import { DeleteRoleInput } from '../../domain/dto/delete-role.input';
import { DeleteRolesPipe } from './delete-roles.pipe';

describe('DeleteRolesPipe', () => {
  it('should be defined', () => {
    expect(
      new DeleteRolesPipe({ user: { _id: '', roleId: '' } }),
    ).toBeDefined();
  });

  it('should return an array of roles', () => {
    const _key = faker.datatype.uuid();
    const context: IContextGraphQL = {
      user: {
        _id: `Users/${_key}`,
        roleId: `Roles/${faker.datatype.uuid()}`,
      },
    };
    const deleteRolesPipe = new DeleteRolesPipe(context);
    const deleteRoleInput: DeleteRoleInput = { _key };
    const roles = [deleteRoleInput];
    const resultExpected: DeleteRoleDto[] = [
      {
        _id: `Roles/${_key}`,
        ...deleteRoleInput,
      },
    ];

    const result = deleteRolesPipe.transform(roles);

    expect(result).toEqual(resultExpected);
  });
});
