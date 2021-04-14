import { User } from '../../users/entities/user.entity';

export interface IPayload {
  user: User;
  token: string;
}
