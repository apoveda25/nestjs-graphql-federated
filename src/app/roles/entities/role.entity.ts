import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Scope } from '../../scopes/entities/scope.entity';
import { User } from '../../users/entities/user.entity';

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
    description: `Example field (${Date.now()})`,
  })
  createdAt: number;

  @Field(() => Int, {
    description: `Example field (${Date.now()})`,
  })
  updatedAt: number;

  @Field(() => [User])
  users?: User[];

  @Field(() => [Scope])
  scopes?: Scope[];
}
