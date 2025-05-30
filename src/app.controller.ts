import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ResponseUtil } from './common/utils/response.util';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health-check')
  check(): ApiResponse<{ status: string }> {
    return ResponseUtil.ok({ status: 'ok' }, 'Service is healthy');
  }
}
