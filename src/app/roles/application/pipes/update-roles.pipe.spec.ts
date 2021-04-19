import * as faker from 'faker';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { UpdateRoleDto } from '../../domain/dto/update-role.dto';
import { UpdateRoleInput } from '../../domain/dto/update-role.input';
import { UpdateRolesPipe } from './update-roles.pipe';

describe('UpdateRolesPipe', () => {
  it('should be defined', () => {
    expect(
      new UpdateRolesPipe({ user: { _id: '', roleId: '' } }),
    ).toBeDefined();
  });

  it('should return an array of roles', () => {
    const _key = faker.datatype.uuid();
    const updatedAt = Date.now();
    const context: IContextGraphQL = {
      user: {
        _id: `Users/${_key}`,
        roleId: `Roles/${faker.datatype.uuid()}`,
      },
    };
    const updateRolesPipe = new UpdateRolesPipe(context);
    const updateRoleInput: UpdateRoleInput = {
      _key,
      name: faker.random.word(),
      description: faker.random.words(10),
      active: true,
      default: false,
    };
    const resultExpected: UpdateRoleDto = {
      _id: `Roles/${_key}`,
      ...updateRoleInput,
      updatedAt,
      updatedBy: context.user._id,
    };

    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(updatedAt);

    const result = updateRolesPipe.transform([updateRoleInput]);

    expect(dateNowSpy).toBeCalled();
    expect(result).toEqual([resultExpected]);
  });
});
