import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  //--------------
  async SignUp({ username, password }: UserDTO): Promise<{ message: string }> {
    const userExist = await this.userService.UserExist(username);
    if (userExist) {
      throw new BadRequestException('user existed');
    }
    // tạo một salt ngẫu nhiên
    const salt = await bcrypt.genSalt();
    const hashpass = await bcrypt.hash(password, salt);
    await this.userService.create({ username, password: hashpass });
    return { message: 'Created new account' };
  }
  async Login({ username, password }: UserDTO) {
    const userExist = await this.userService.UserExist(username);
    console.log('🚀 ~ AuthService ~ Login ~ userExist:', userExist);
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
