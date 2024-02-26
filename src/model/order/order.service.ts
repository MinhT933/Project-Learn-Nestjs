import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderEntity } from './order.entity';
import mongoose, { Model } from 'mongoose';
import { OrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderEntity.name)
    private OrderModel: Model<OrderEntity>,
  ) {}

  //---------
  async createOrder(dto: OrderDTO) {
    const order = new this.OrderModel(dto);
    return await order.save();
  }

  async getListOrder() {
    return await this.OrderModel.find().lean();
  }

  async getOrderById(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    const order = await this.OrderModel.findById(objectId).lean();
    console.log('🚀 ~ OrderService ~ getOrderById ~ order:', order);
    if (!order) {
      throw BadRequestException;
    } else {
      return order;
    }
  }
}
