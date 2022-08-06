import { Module } from '@nestjs/common';
import Controller from 'src/controllers/AuthController';
import Service from 'src/services/AuthService';
import Provider from 'src/providers/UserProvider';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/config/database.module';
import EmailModule from './Mail';
import SmsModule from './Sms';
import { APP_GUARD } from '@nestjs/core';
import AuthGuard from 'src/middleware/AuthGuard';

@Module({
  imports: [
    EmailModule,
    SmsModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: 'JWT',
      signOptions: { expiresIn: '600000000s' },
    }),
  ],

  controllers: [Controller],
  providers: [
    Service,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ...Provider,
  ],
})
export default class AuthGuardModule {}
