import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/status')
  hc(): any {
    return {
      status: 'OK',
      BUILD_DATE: '15/12/2022 11:00',
    };
  }

 
}
