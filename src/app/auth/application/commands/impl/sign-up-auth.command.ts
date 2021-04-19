import { ICommand } from '@nestjs/cqrs';
import { SignUpAuthDto } from '../../../domain/dto/sign-up-auth.dto';

export class SignUpAuthCommand implements ICommand {
  constructor(public readonly payload: SignUpAuthDto) {}
}
