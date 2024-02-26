import { Global, Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderEntity, OrderSchema } from '../order/order.entity';
import { BookService } from 'src/book/book.service';
import { OrderService } from '../order/order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderEntity.name, schema: OrderSchema },
    ]),
  ],
  controllers: [StripeController],
  providers: [StripeService, OrderService],
  exports: [StripeService],
})
export class StripeModule {}
