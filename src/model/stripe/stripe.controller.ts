import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { OrderDTO, PaymentDTO } from '../order/dto/order.dto';
import { OrderController } from '../order/order.controller';
import { OrderService } from '../order/order.service';

@Controller('Payment')
@ApiTags('Payment')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private orderService: OrderService,
  ) {}

  @Put(':id')
  async checkout(@Param('id') id: string) {
    try {
      const getOrderbyId = await this.orderService.getOrderById(id);
      const totalPrice = getOrderbyId.totalPrice;
      if (totalPrice) {
        return this.stripeService.checkout(id, totalPrice);
      } else {
        throw new BadRequestException('fail');
      }
    } catch (error) {
      throw error;
    }
  }
}
