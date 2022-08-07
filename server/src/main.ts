import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as moduleAlias from 'module-alias';
import HttpExceptionFilter from './middleware/ExceptionFilter';
import AuthMiddleware from './middleware/AuthMiddleware';

moduleAlias.addAliases({
  '@src': path.resolve(''),
  '@interfaces': path.resolve(__dirname, 'interfaces'),
  '@modules': path.resolve(__dirname, 'modules'),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(AuthMiddleware);
  await app.listen(9000);
}
bootstrap();
