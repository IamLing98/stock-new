import { Module } from '@nestjs/common';
import Controller from 'src/controllers/MatrixController';
import Service from 'src/services/MatrixService';

@Module({
  imports: [],
  controllers: [Controller],
  providers: [Service],
})
export default class AuthModule {}
