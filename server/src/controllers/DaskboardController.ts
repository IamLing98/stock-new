import { Controller, Get, Param, Post } from '@nestjs/common';
import { DashboardService } from '../services/DashboardService';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getHello(): string {
    return "Hello Dashboard";
  }

  // @Get(':code')
  // getDataBCTC(@Param('code') code: string): any {
  //   return this.stockService.getDataBCTC(code);
  // }
  
}
export default DashboardController;