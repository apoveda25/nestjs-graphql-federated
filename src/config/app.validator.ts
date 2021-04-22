import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
  validateSync,
} from 'class-validator';

class AppVariables {
  @IsUrl({ require_tld: false })
  name: string;

  @IsString()
  host: string;

  @Min(1024)
  @Max(49151)
  port: number;

  @IsBoolean()
  referrerPolicy: boolean;

  @IsBoolean()
  contentSecurityPolicy: boolean;
}

class ArangoDBVariables {
  @IsUrl({ require_tld: false }, { each: true })
  urls: string[];

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString({ each: true })
  certs: string[];
}

class GraphQLVariables {
  @IsBoolean()
  introspection: boolean;

  @IsBoolean()
  playground: boolean;

  @IsBoolean()
  subscriptions: boolean;

  @IsString()
  autoSchemaFile: string;

  @IsBoolean()
  sortSchema: boolean;
}

class EnvironmentVariables {
  @ValidateNested({ each: true })
  app: AppVariables;

  @ValidateNested({ each: true })
  arangodb: ArangoDBVariables;

  @ValidateNested({ each: true })
  graphql: GraphQLVariables;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
