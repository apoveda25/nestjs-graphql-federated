import { SetMetadata } from '@nestjs/common';
import { PermissionsEnum } from '../enums/permissions';

export const AUTHORIZATION_KEY = 'authorizations';
export const Authorization = (...permissions: PermissionsEnum[]) =>
  SetMetadata(AUTHORIZATION_KEY, permissions);
