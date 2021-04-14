import { ICommand } from '@nestjs/cqrs';
import { SignInAuthDto } from '../../dto/sign-in-auth.dto';

export class SignInAuthCommand implements ICommand {
  constructor(public readonly payload: SignInAuthDto) {}
}
