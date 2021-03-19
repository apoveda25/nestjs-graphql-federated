import { Config as IOptions } from 'arangojs/connection';
import { ModuleMetadata, Type } from './module-metadata.interface';

export interface IOptionsFactory {
  createOptions(): Promise<IOptions> | IOptions;
}

export interface IOptionsAsync extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<IOptionsFactory>;
  useClass?: Type<IOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<IOptions> | IOptions;
  inject?: any[];
}
