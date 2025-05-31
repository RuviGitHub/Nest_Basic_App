import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ResponseUtil } from './common/utils/response.util';

@Controller('/')
export class AppController {

  @Get('health-check')
  check(): ApiResponse<{ status: string }> {
    return ResponseUtil.ok({ status: 'ok' }, 'Service is healthy');
  }
}
