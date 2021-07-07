import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../../../roles/domain/entities/role.entity';

@ObjectType()
export class User {
  @Field(() => ID, {
    description: 'Example field (Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _id: string;

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

  password?: string;

  @Field(() => String, {
    description: 'Example field (name)',
  })
  name: string;

  @Field(() => String, {
    description: 'Example field (surname)',
  })
  surname: string;

  @Field(() => Boolean, {
    description: 'Example field (true)',
  })
  active: boolean;

  @Field(() => Boolean, {
    description: 'Example field (true)',
  })
  emailActive: boolean;

  emailCode?: string;

  emailCodeExpire?: number;

  @Field(() => GraphQLTimestamp, {
    description: `Example field (1622236241726)`,
    nullable: true,
  })
  birthday?: number;

  @Field(() => String, {
    description: `Example field (MALE | FEMALE | UNDEFINED)`,
  })
  gender: string;

  @Field(() => String, {
    description: `Example field (prefix)`,
  })
  prefix: string;

  @Field(() => String, {
    description: `Example field (https://domian.com)`,
  })
  urlImage: string;

  @Field(() => String, {
    description: `Example field (Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d)`,
  })
  createdBy: string;

  @Field(() => String, {
    description: `Example field (Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d)`,
  })
  updatedBy: string;

  @Field(() => GraphQLTimestamp, {
    description: `Example field (1622236241726)`,
  })
  createdAt: number;

  @Field(() => GraphQLTimestamp, {
    description: `Example field (1622236241726)`,
    nullable: true,
  })
  updatedAt: number;

  @Field(() => Role, {
    description: `Role that belong to the user`,
  })
  role?: Role;
}
