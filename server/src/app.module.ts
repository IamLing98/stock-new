import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AuthModule from 'src/modules/Auth';
import MatrixModule from 'src/modules/Matrix';
import MailModule from 'src/modules/Mail';
import AuthGuardModule from 'src/modules/AuthGuardModule';
import TasksModule from 'src/modules/Task';
import DashBoardModule from 'src/modules/Dashboard';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TasksModule,
    AuthModule,
    MatrixModule,
    MailModule,
    AuthGuardModule,
    DashBoardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
