import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import type { Config as IOptions } from 'arangojs/connection';
import { ARANGODB_OPTIONS } from './arangodb.constant';
import { ArangodbService } from './arangodb.service';
import {
  IOptionsAsync,
  IOptionsFactory,
} from './interfaces/module-options.interfaces';

@Global()
@Module({
  providers: [ArangodbService],
  exports: [ArangodbService],
})
export class ArangodbModule {
  static forRoot(options: IOptions = {}): DynamicModule {
    return {
      module: ArangodbModule,
      providers: [
        ArangodbService,
        {
          provide: ARANGODB_OPTIONS,
          useValue: options,
        },
      ],
      exports: [ArangodbService],
    };
  }

  static forRootAsync(options: IOptionsAsync): DynamicModule {
    return {
      module: ArangodbModule,
      imports: options.imports,
      providers: [ArangodbService, ...this.createAsyncProviders(options)],
      exports: [ArangodbService],
    };
  }

  private static createAsyncProviders(options: IOptionsAsync): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: IOptionsAsync): Provider {
    if (options.useFactory) {
      return {
        provide: ARANGODB_OPTIONS,
        useFactory: async (...args: any[]) => await options.useFactory(...args),
        inject: options.inject || [],
      };
    }
    return {
      provide: ARANGODB_OPTIONS,
      useFactory: async (optionsFactory: IOptionsFactory) =>
        await optionsFactory.createOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
