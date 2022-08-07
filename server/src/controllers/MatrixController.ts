import { Controller, Post, Req, Res, HttpCode, Get } from '@nestjs/common';
import Service from 'src/services/MatrixService';

@Controller('stock')
export class MartrixController {
  constructor(private service: Service) {}

  @Get('matrix')
  @HttpCode(200)
  get(@Req() req, @Res({ passthrough: true }) res): any {
    return this.service.getMatrix(req?.body);
  }

  @Post()
  @HttpCode(200)
  login(@Req() req, @Res({ passthrough: true }) res): any {
    console.log('request login', req?.body);
    // const rs = this.service.login(req?.body);
    return null;
  }
}

export default MartrixController;
