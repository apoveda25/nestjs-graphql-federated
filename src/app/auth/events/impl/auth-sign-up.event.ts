import { IEvent } from '@nestjs/cqrs';
import { SignUpAuthDto } from '../../dto/sign-up-auth.dto';

export class AuthSignUpEvent implements IEvent {
  constructor(public readonly user: SignUpAuthDto) {}
}
