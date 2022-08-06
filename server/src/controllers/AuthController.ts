import {
  Controller,
  Post,
  Req,
  Res,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import Service from 'src/services/AuthService';

@Controller('auth')
export class AuthController {
  constructor(private service: Service) {}

  @Post('signup')
  @HttpCode(200)
  signin(@Req() req, @Res({ passthrough: true }) res): any {
    const rs = this.service.signup(req?.body);
    return rs;
  }

  @Post('signin')
  @HttpCode(200)
  signup(@Req() req, @Res({ passthrough: true }) res): any {
    return this.service.signin(req?.body);
  }

  @Post('signinToken')
  @HttpCode(200)
  signinToken(@Req() req, @Res({ passthrough: true }) res): any {
    return this.service.signinToken(req?.user);
  }

  @Post('verify')
  @HttpCode(200)
  verify(@Req() req, @Res({ passthrough: true }) res): any {
    return this.service.verify(req?.user, req?.body);
  }
}

export default AuthController;
