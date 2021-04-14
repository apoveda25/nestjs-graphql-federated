import { ICommand } from '@nestjs/cqrs';
import { SignUpAuthDto } from '../../dto/sign-up-auth.dto';

export class SignUpAuthCommand implements ICommand {
  constructor(public readonly payload: SignUpAuthDto) {}
}
