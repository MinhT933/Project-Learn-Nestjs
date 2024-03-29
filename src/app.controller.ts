import { Controller, Get, Request } from '@nestjs/common';

import { AuthService } from './model/auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
