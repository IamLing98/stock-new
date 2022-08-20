import { Module } from '@nestjs/common';
import Service from 'src/services/TasksService';

@Module({
  providers: [Service],
})
export default class TasksModule {}
