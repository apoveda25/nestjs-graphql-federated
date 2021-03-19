import { Inject, Injectable } from '@nestjs/common';
import { Database } from 'arangojs';
import type { Config as IOptions } from 'arangojs/connection';
import { ARANGODB_OPTIONS } from './arangodb.constant';

@Injectable()
export class ArangodbService extends Database {
  constructor(@Inject(ARANGODB_OPTIONS) private options: IOptions) {
    super(options);
  }
}
