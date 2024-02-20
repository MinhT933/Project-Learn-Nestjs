import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/auth.dto';
import { Response } from 'express';
import { Public } from '../util/contanst';

@Controller('auth')
@ApiCookieAuth()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: UserDTO) {
    return this.authService.SignUp(body);
  }
  @Public()
  @Post('login')
  async login(
    @Body() body: UserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.Login(body);

    response
      .cookie('access_token', access_token, {
        httpOnly: true, //cross-site scripting (XSS) attacks
        secure: false, //sent over HTTPS connections
        sameSite: 'lax',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .send({ status: 'ok' });
  }
}
