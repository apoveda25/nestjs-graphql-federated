import { SignInAuthCommandHandler } from './sign-in-auth.handler';
import { SignUpAuthCommandHandler } from './sign-up-auth.handler';

export const AuthCommandHandlers = [
  SignUpAuthCommandHandler,
  SignInAuthCommandHandler,
];
