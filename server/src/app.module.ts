import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AuthModule from 'src/modules/Auth';
import MatrixModule from 'src/modules/Matrix';
import MailModule from 'src/modules/Mail';

@Module({
  imports: [AuthModule, MatrixModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
