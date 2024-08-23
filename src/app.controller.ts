import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Mail } from './mail.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/sendEmail')
  async sendEmail(@Body() data: Mail) {
    await this.appService.sendWelcomeEmail(data);
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
