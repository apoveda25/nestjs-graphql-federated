import { SetMetadata } from '@nestjs/common';
import { AuthorizationEnum } from '../enums/authorization';

export const AUTHORIZATION_KEY = 'authorizations';
export const Authorization = (...authorizations: AuthorizationEnum[]) =>
  SetMetadata(AUTHORIZATION_KEY, authorizations);
