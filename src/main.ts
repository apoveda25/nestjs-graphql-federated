import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import compression from 'fastify-compress';
import helmet from 'fastify-helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ http2: true }),
  );
  app.register(helmet, {
    contentSecurityPolicy: false,
  });
  app.register(compression, { encodings: ['gzip'] });

  const configService = app.get(ConfigService);

  await app.listen(configService.get('app.port'));
}
bootstrap();
