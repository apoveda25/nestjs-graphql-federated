import { registerEnumType } from '@nestjs/graphql';

export enum usersGenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNDEFINED = 'UNDEFINED',
}

registerEnumType(usersGenderEnum, {
  name: 'usersGenderEnum',
});
