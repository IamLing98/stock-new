import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StockController } from './controllers/StockController';
import { AppService } from './app.service';
import { StockService } from './services/StockService';
import AuthModule from 'src/modules/Auth';

@Module({
  imports: [AuthModule],
  controllers: [AppController, StockController],
  providers: [AppService, StockService],
})
export class AppModule {}
