import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // app.enableCors();
  // app.use(compression());
  // app.use(
  //   helmet({
  //     referrerPolicy: configService.get('app.referrerPolicy'),
  //     contentSecurityPolicy: configService.get('app.contentSecurityPolicy'),
  //   }),
  // );

  await app.listen(configService.get('app.port'));
}
bootstrap().then((r) => r);
