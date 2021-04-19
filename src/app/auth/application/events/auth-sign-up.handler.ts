import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthSignUpEvent } from '../../domain/events/auth-sign-up.event';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository';

@EventsHandler(AuthSignUpEvent)
export class AuthSignUpEventHandler implements IEventHandler<AuthSignUpEvent> {
  constructor(private readonly authRepository: AuthRepository) {}

  async handle(event: AuthSignUpEvent) {
    const user = { ...event.user };
    const hasRole = {
      _from: event.user._id,
      _to: event.user.roleId,
      createdAt: event.user.createdAt,
      createdBy: event.user.createdBy,
      updatedAt: event.user.updatedAt,
      updatedBy: event.user.updatedBy,
    };
    delete user.roleId;

    return await this.authRepository.signUp(user, hasRole);
  }
}
