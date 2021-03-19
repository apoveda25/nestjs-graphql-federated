import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateScopeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
