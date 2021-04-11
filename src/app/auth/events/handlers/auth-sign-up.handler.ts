import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthRepository } from '../../repositories/auth.repository';
import { AuthSignUpEvent } from '../impl/auth-sign-up.event';

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
