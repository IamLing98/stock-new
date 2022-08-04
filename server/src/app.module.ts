import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AuthModule from 'src/modules/Auth';
import MatrixModule from 'src/modules/Matrix';
import DashBoardModule from './modules/Dashboard';

@Module({
  imports: [AuthModule, MatrixModule, DashBoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
