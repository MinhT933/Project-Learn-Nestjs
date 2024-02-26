import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { OrderDTO, PaymentDTO } from '../order/dto/order.dto';
import { InjectModel } from '@nestjs/mongoose';

import { OrderEntity } from '../order/order.entity';
import { Model } from 'mongoose';
import { BookService } from 'src/book/book.service';
import { TypeOrder } from '../util/contanst';

@Injectable()
export class StripeService {
  constructor(
    @InjectModel(OrderEntity.name)
    private orderEntityModel: Model<OrderEntity>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
  }

  private stripe: Stripe;

  async checkout(id: string, cart: PaymentDTO['totalPrice']) {
    const paymentSuccess = await this.stripe.paymentIntents.create({
      amount: cart,
      currency: 'vnd',
      payment_method_types: ['card'],
    });

    if (paymentSuccess) {
      try {
        const updatedOrder = await this.orderEntityModel.findByIdAndUpdate(
          id,
          { status: TypeOrder.ALREADY_PAID },
          { new: true },
        );
        return updatedOrder;
      } catch (error) {
        throw error;
      }
    }
  }
}
