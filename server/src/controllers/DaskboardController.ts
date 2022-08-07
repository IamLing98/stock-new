import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { DashboardService } from '../services/DashboardService';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getHello(): string {
    return "Hello Dashboard";
  }

  @Get('/heapMap')
  getDataBCTC(): any {
    return this.dashboardService.getHeapTreeData();
  }

  @Get('/topMarketInfluence/:code')
  getTopMarketInfluence(@Param('code') code): any {
    return this.dashboardService.getTopMarketInfluence(code);
  }
  
}
export default DashboardController;