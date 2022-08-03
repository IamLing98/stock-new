import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StockController } from './controllers/StockController';
import { AppService } from './app.service';
import { StockService } from './services/StockService';
import AuthModule from 'src/modules/Auth';
import MatrixModule from 'src/modules/Matrix';

@Module({
  imports: [AuthModule, MatrixModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
