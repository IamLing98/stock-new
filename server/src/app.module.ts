import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import AuthModule from 'src/modules/Auth';
import MatrixModule from 'src/modules/Matrix';
import MailModule from 'src/modules/Mail';
import AuthGuardModule from 'src/modules/AuthGuardModule';
import TasksModule from 'src/modules/Task';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // TasksModule,
    AuthModule,
    MatrixModule,
    MailModule,
    AuthGuardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
