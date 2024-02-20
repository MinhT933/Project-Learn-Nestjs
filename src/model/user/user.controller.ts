import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(@Body() dto: UserDTO) {
    try {
      return await this.userService.create(dto);
    } catch (error) {
      throw new BadGatewayException({
        message: error.message,
        statusCode: 502,
        cause: error,
      });
    }
  }
  @Get()
  async getlistUser() {
    return this.userService.getListUser();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUserByID(id);
  }

  @Get(':id')
  getbyId(@Param('id') id: string) {
    return this.userService.getUserByID(id);
  }

  @Put(':id')
  async updateUserByID(@Param('id') id: string, @Body() dto: UserDTO) {
    return this.userService.updateUserByID(id, dto);
  }
}
