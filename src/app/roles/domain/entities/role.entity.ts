import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Scope } from '../../../scopes/domain/entities/scope.entity';
import { User } from '../../../users/domain/entities/user.entity';

@ObjectType()
export class Role {
  @Field(() => ID, {
    description: 'Example field (Roles/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _id: string;

  @Field(() => ID, {
    description: 'Example field (20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  _key: string;

  @Field(() => String, {
    description: 'Example field (name)',
  })
  name: string;

  @Field(() => String, {
    description: 'Example field (description)',
  })
  description: string;

  @Field(() => Boolean, {
    description: 'Example field (true)',
  })
  active: boolean;

  @Field(() => Int, {
    description: 'Example field (9)',
  })
  level: number;

  @Field(() => Boolean, {
    description: 'Example field (false)',
  })
  default: boolean;

  @Field(() => String, {
    description: `Example field (Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d)`,
  })
  createdBy: string;

  @Field(() => String, {
    description: `Example field (Users/20f736ce-b6a0-4ed5-8062-47d32c844d3d)`,
  })
  updatedBy: string;

  @Field(() => Int, {
    description: `Example field (1622236241726)`,
  })
  createdAt: number;

  @Field(() => Int, {
    description: `Example field (1622236241726)`,
    nullable: true,
  })
  updatedAt: number;

  @Field(() => [User])
  users?: User[];

  @Field(() => [Scope])
  scopes?: Scope[];
}
