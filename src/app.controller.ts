import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
  constructor() {}

  @Get('/status')
  hc(): any {
    return {
      status: 'OK',
      BUILD_DATE: '15/12/2022 11:00',
    };
  }

 
}
