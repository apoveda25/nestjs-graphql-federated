import { User } from '../../../users/domain/entities/user.entity';

export interface IPayload {
  user: User;
  token: string;
}
