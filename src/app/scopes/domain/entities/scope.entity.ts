import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../../../roles/domain/entities/role.entity';

@ObjectType()
export class Scope {
  @Field(() => ID, {
    description: 'Example field (Scopes/f7053c3c-51ec-4f23-b970-156e11e2bff3)',
  })
  _id: string;

  @Field(() => ID, {
    description: 'Example field (f7053c3c-51ec-4f23-b970-156e11e2bff3)',
  })
  _key: string;

  @Field(() => String, {
    description: 'Example field (scopes_create)',
  })
  name: string;

  @Field(() => String, {
    description: 'Example field (CREATE)',
  })
  action: string;

  @Field(() => String, {
    description: 'Example field (Scopes)',
  })
  collection: string;

  @Field(() => GraphQLTimestamp, {
    description: 'Example field (1617105326902)',
  })
  createdAt: number;

  @Field(() => GraphQLTimestamp, {
    description: 'Example field (1617105326902)',
  })
  updatedAt: number;

  @Field(() => String, {
    description: 'Example field (Users/3592b39d-0b79-45dc-a6d0-c8ba815cf350)',
  })
  createdBy: string;

  @Field(() => String, {
    description: 'Example field (Users/3592b39d-0b79-45dc-a6d0-c8ba815cf350)',
    nullable: true,
  })
  updatedBy: string;

  @Field(() => [Role], {
    description: `Roles assigned this scope`,
  })
  roles?: Role[];
}
