import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './model/auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AppService) {}

  // @UseGuards(JwtAuthG)

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
