import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../util/contanst';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // console.log('🚀 ~ AuthGuard ~ canActivate ~ request:', request);

    const token = this.extractTokenFromHeader(request);
    // console.log('🚀 ~ AuthGuard ~ canActivate ~ token:', token);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const secret = this.configService.get('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });

      const user = await this.userService.getUserByID(payload.id);
      console.log('🚀 ~ AuthGuard ~ canActivate ~ user:', user);

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = JSON.stringify(user);
    } catch (error) {
      throw error;
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(
      '🚀 ~ AuthGuard ~ extractTokenFromHeader ~ request.cookies:',
      request.cookies,
    );
    console.log(
      '🚀 ~ AuthGuard ~ extractTokenFromHeader ~ request.cookies.access_token:',
      request.cookies.access_token,
    );
    if (request.cookies && request.cookies.access_token) {
      // get cookie from request
      return request.cookies.access_token;
    }
    return null;
  }
}
