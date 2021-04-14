import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AuthSignUpEvent } from '../../events/impl/auth-sign-up.event';
import { IPayload } from '../../interfaces/payload.interface';
import { AuthModel } from '../../models/auth.model';
import { SignUpAuthCommand } from '../impl/sign-up-auth.command';

@CommandHandler(SignUpAuthCommand)
export class SignUpAuthCommandHandler
  implements ICommandHandler<SignUpAuthCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly authModel: AuthModel,
  ) {}

  async execute(command: SignUpAuthCommand): Promise<IPayload> {
    const userCreated = await this.authModel.signUp(command.payload);

    this.eventBus.publish(new AuthSignUpEvent(userCreated));

    return { user: userCreated, token: '' };
  }
}
