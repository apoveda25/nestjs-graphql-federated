import { SignUpAuthDto } from '../dto/sign-up-auth.dto';

export interface IPayload {
  user: SignUpAuthDto;
  token: string;
}
