import { Field, ID, InputType } from '@nestjs/graphql';
import { usersGenderEnum } from '../enums/users.enum';

@InputType()
export class CreateUserInput {
  @Field(() => ID, {
    description: 'Example field (20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _key: string;

  @Field(() => String, {
    description: 'Example field (username)',
  })
  username: string;

  @Field(() => String, {
    description: 'Example field (email@email.com)',
  })
  email: string;

  @Field(() => String, {
    description: 'Example field (secret123456)',
  })
  password: string;

  @Field(() => String, {
    description: 'Example field (name)',
    nullable: true,
    defaultValue: '',
  })
  name: string;

  @Field(() => String, {
    description: 'Example field (surname)',
    nullable: true,
    defaultValue: '',
  })
  surname: string;

  @Field(() => Number, {
    description: `Example field (1622236241726)`,
    nullable: true,
    defaultValue: null,
  })
  birthday: number;

  @Field(() => usersGenderEnum, {
    description: `Example field (MALE | FEMALE | UNDEFINED)`,
    nullable: true,
    defaultValue: 'UNDEFINED',
  })
  gender: string;

  @Field(() => String, {
    description: `Example field (prefix)`,
    nullable: true,
    defaultValue: '',
  })
  prefix: string;

  @Field(() => ID, {
    description: `Example field (Roles/20f736ce-b6a0-4ed5-8062-47d32c844d3d)`,
  })
  roleId: string;
}
