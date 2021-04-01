import { AggregateRoot } from '@nestjs/cqrs';

export class ScopeCreateModelFaker extends AggregateRoot {
  constructor(private readonly input) {
    super();
  }

  create(): void {}

  commit(): void {}
}
