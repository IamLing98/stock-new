import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { Abstract } from 'src/models/AbtractInterface';
import Service from 'src/services/AuthService';
import { IUser } from 'src/models/User';
import AuthDTO from 'src/dto/AuthDTO';

@Controller('login')
export class AuthController {
  constructor(private service: Service) {}

  @Post()
  @HttpCode(200)
  login(@Req() req, @Res({ passthrough: true }) res): any {
    console.log('request login', req?.body);
    const rs = this.service.login(req?.body);
    return rs;
  }
}

export default AuthController;
