import { Module } from '@nestjs/common';
import Controller from 'src/controllers/DaskboardController';
import Service from '../services/DashboardService';

@Module({
  imports: [],
  controllers: [Controller],
  providers: [Service],
})
export default class DashBoardModule {}
