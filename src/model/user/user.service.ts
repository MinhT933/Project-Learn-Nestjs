import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './user.entity';
import mongoose, { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private userModel: Model<UserEntity>,
  ) {}

  async create(dto: UserDTO) {
    const user = new this.userModel(dto);
    return await user.save();
  }
  async getListUser() {
    return await this.userModel.find().lean();
  }
  async removeUserByID(id: string) {
    const result = await this.userModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`ko tìm thấy người dùng ${id}`);
    } else {
      return {
        message: `Xóa ok`,
      };
    }
  }
  async getUserByID(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    const user = this.userModel.findById(objectId).lean();
    if (!user) {
      throw BadRequestException;
    } else {
      return user;
    }
  }
  async updateUserByID(id: string, dto: UserDTO) {
    const user = await this.userModel.findByIdAndUpdate({ _id: id }, dto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException(`ko tìm thấy người dùng ${id}`);
    } else {
      return user;
    }
  }
  async UserExist(username: string) {
    const userExist = await this.userModel.findOne({ username }).lean();
    return userExist;
  }
}
