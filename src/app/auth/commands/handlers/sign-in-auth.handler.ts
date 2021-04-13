import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { IPayload } from '../../interfaces/payload.interface';
import { AuthModel } from '../../models/auth.model';
import { SignInAuthCommand } from '../impl/sign-in-auth.command';

@CommandHandler(SignInAuthCommand)
export class SignInAuthCommandHandler
  implements ICommandHandler<SignInAuthCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly authModel: AuthModel,
  ) {}

  async execute(command: SignInAuthCommand): Promise<IPayload> {
    const userValidated = await this.authModel.signIn(command.payload);

    // this.eventBus.publish(new AuthSignInEvent(userCreated));

    return { user: userValidated, token: '' };
  }
}
