import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
// import { UserDTO } from './dto/auth.dto';
import { Response } from 'express';
import { Public } from '../util/contanst';
import { AuthDTO } from './dto/auth.dto';
import { UserDTO } from '../user/dto/user.dto';
import { User } from 'src/decorator/user.decorator';

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
    @Body() body: AuthDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const { access_token } = await this.authService.login(body);

      response
        .cookie('access_token', access_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          path: '/',
          maxAge: 3600000,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .send({ status: 'ok', access_token });
    } catch (error) {
      console.error('Error setting cookie:', error);
      response.status(500).send({ error: 'Internal Server Error' });
    }
  }

  @Get('me')
  async getMe(@User() user) {
    return JSON.parse(user);
  }

  @Post('Log-out')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('access_token', '').send({ message: 'logout success' });
  }
}
