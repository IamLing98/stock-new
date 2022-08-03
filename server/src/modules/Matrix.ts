import { Module } from '@nestjs/common';
import Controller from 'src/controllers/MatrixController';
import Provider from 'src/providers/UserProvider';

@Module({
  imports: [],
  controllers: [Controller],
  // providers: [Service, ...Provider],
})
export default class AuthModule {}
