import { Controller, Get, Param, Post } from '@nestjs/common';
import { StockService } from '../services/StockService';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  getHello(): string {
    return "Hello Stock";
  }

  @Get(':code')
  getDataBCTC(@Param('code') code: string): any {
    return this.stockService.getDataBCTC(code);
  }
  
}
