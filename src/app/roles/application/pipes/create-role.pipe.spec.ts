import * as faker from 'faker';
import { IContextGraphQL } from '../../../../../dist/shared/interfaces/context-graphql.interface';
import { CreateRoleDto } from '../../domain/dto/create-role.dto';
import { CreateRoleInput } from '../../domain/dto/create-role.input';
import { CreateRolePipe } from './create-role.pipe';

describe('CreateRolePipe', () => {
  it('should be defined', () => {
    expect(new CreateRolePipe({ user: { _id: '', roleId: '' } })).toBeDefined();
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
    const createRolePipe = new CreateRolePipe(context);
    const createRoleInput: CreateRoleInput = {
      _key,
      name: faker.random.word(),
      description: faker.random.words(10),
      active: true,
    };
    const resultExpected: CreateRoleDto = {
      _id: `Roles/${_key}`,
      ...createRoleInput,
      default: false,
      createdAt,
      updatedAt: 0,
      createdBy: context.user._id,
      updatedBy: '',
    };

    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(createdAt);

    const result = createRolePipe.transform(createRoleInput);

    expect(dateNowSpy).toBeCalled();
    expect(result).toEqual(resultExpected);
  });
});
