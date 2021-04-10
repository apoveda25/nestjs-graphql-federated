import * as faker from 'faker';
import { IContextGraphQL } from '../../../../dist/shared/interfaces/context-graphql.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserInput } from '../dto/update-user.input';
import { UpdateUsersPipe } from './update-users.pipe';

describe('UpdateUsersPipe', () => {
  it('should be defined', () => {
    expect(
      new UpdateUsersPipe({ user: { _id: '', roleId: '' } }),
    ).toBeDefined();
  });

  it('should return a user', () => {
    const _key = faker.datatype.uuid();
    const gender = faker.name.gender();
    const birthday = faker.date.past().getMilliseconds();
    const updatedAt = Date.now();
    const context: IContextGraphQL = {
      user: {
        _id: `Users/${_key}`,
        roleId: `Roles/${faker.datatype.uuid()}`,
      },
    };
    const updateUsersPipe = new UpdateUsersPipe(context);
    const updateUserInput: UpdateUserInput = {
      _key,
      username: faker.name.firstName(),
      name: faker.name.firstName(),
      surname: faker.name.firstName(),
      email: faker.internet.email(),
      birthday,
      gender,
      prefix: faker.name.firstName(),
    };
    const resultExpected: UpdateUserDto = {
      _id: `Users/${_key}`,
      ...updateUserInput,
      updatedAt,
      updatedBy: `Users/${_key}`,
    };

    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(updatedAt);

    const result = updateUsersPipe.transform([updateUserInput]);

    expect(dateNowSpy).toBeCalled();
    expect(result).toEqual([resultExpected]);
  });
});
