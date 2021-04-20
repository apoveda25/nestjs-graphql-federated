import * as faker from 'faker';
import { delta } from '../../../../shared/helpers/delta';
import { codeDigitsGenerate } from '../../../../shared/helpers/generate-code';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { CreateUserInput } from '../../domain/dto/create-user.input';
import { CreateUserPipe } from './create-user.pipe';

describe('CreateUsersPipe', () => {
  it('should be defined', () => {
    expect(new CreateUserPipe({ user: { _id: '', roleId: '' } })).toBeDefined();
  });

  it('should return a user', () => {
    const _key = faker.datatype.uuid();
    const gender = faker.name.gender();
    const birthday = faker.date.past().getMilliseconds();
    const createdAt = Date.now();
    const deltaParam = { days: 1 };
    const deltaPlain = delta(deltaParam);
    const emailCode = codeDigitsGenerate(6);
    const context: IContextGraphQL = {
      user: {
        _id: `Users/${_key}`,
        roleId: `Roles/${faker.datatype.uuid()}`,
      },
    };
    const createUserPipe = new CreateUserPipe(context);
    const createUserInput: CreateUserInput = {
      _key,
      password: 'secret123456',
      username: faker.name.firstName(),
      name: faker.name.firstName(),
      surname: faker.name.firstName(),
      email: faker.internet.email(),
      birthday,
      gender,
      prefix: '',
      roleId: `Roles/${_key}`,
    };
    const resultExpected: CreateUserDto = {
      _id: `Users/${_key}`,
      ...createUserInput,
      emailActive: false,
      emailCode,
      emailCodeExpire: createdAt + deltaPlain,
      active: true,
      urlImage: '',
      createdAt,
      createdBy: `Users/${_key}`,
      updatedAt: 0,
      updatedBy: '',
    };

    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(createdAt);

    const result = createUserPipe.transform(createUserInput);
    result.emailCode = resultExpected.emailCode;

    expect(dateNowSpy).toBeCalled();
    expect(result).toEqual(resultExpected);
  });
});
