import { AggregateRoot } from '@nestjs/cqrs';
import { CreateScopeDto } from '../dto/create-scope.dto';
import { Scope } from '../entities/scope.entity';
import { ScopeCreatedEvent } from '../events/impl/scope-created.event';

export class ScopeCreateModel extends AggregateRoot {
  constructor(private input: CreateScopeDto) {
    super();
  }

  create(scopeConflict: Scope): boolean {
    if (scopeConflict) return false;

    this.apply(new ScopeCreatedEvent(this.input));

    return true;
  }
}
