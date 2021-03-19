import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Scope {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
