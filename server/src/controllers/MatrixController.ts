import { Controller, Req, Res, HttpCode, Get } from '@nestjs/common';
import Service from 'src/services/MatrixService';

@Controller('stock')
export class MartrixController {
  constructor(private service: Service) {}

  @Get('matrix')
  @HttpCode(200)
  get(@Req() req, @Res({ passthrough: true }) res): any {
    return this.service.getMatrix(req?.query.type);
  }
}

export default MartrixController;
