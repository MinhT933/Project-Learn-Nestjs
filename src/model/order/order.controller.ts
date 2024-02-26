import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post()
  async createOder(@Body() dto: OrderDTO) {
    try {
      return await this.orderService.createOrder(dto);
    } catch (error) {
      throw new BadGatewayException({
        message: error.message,
        statusCode: 502,
        cause: error,
      });
    }
  }
  @Get()
  async getListOder() {
    return this.orderService.getListOrder();
  }
}
