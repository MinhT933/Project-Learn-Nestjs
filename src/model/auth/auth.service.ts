import { BadRequestException, Injectable, Post, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '../user/dto/user.dto';
import { response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  //--------------
  async SignUp({
    username,
    password,
    role,
  }: UserDTO): Promise<{ message: string }> {
    const userExist = await this.userService.UserExist(username);
    if (userExist) {
      throw new BadRequestException('user existed');
    }
    // tạo một salt ngẫu nhiên
    const salt = await bcrypt.genSalt();
    const hashpass = await bcrypt.hash(password, salt);
    await this.userService.create({ username, password: hashpass, role });
    return { message: 'Created new account' };
  }
  async Login({ username, password }: AuthDTO) {
    const userExist = await this.userService.UserExist(username);

    if (!userExist) {
      throw new BadRequestException('user not exist ');
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (isMatch || userExist) {
      const payload = {
        id: userExist._id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new BadRequestException('login fail');
    }
  }
}
