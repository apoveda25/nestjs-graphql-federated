import { SetMetadata } from '@nestjs/common';

export const AUTHORIZATION_KEY = 'authorizations';
export const Authorization = (...permissions: string[]) =>
  SetMetadata(AUTHORIZATION_KEY, permissions);
