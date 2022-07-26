import { Module } from '@nestjs/common';
import Controller from 'src/controllers/AuthController';
import Service from 'src/services/AuthService';
import Provider from 'src/providers/UserProvider';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/config/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: 'JWT',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [Controller],
  providers: [Service, ...Provider],
})
export default class AuthModule {}
