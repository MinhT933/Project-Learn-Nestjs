import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BookEntity } from 'src/book/book.entity';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  collection: 'Order',
  toObject: {
    getters: true,
  },
  versionKey: false,
  timestamps: false,
})
export class OrderEntity extends Document {
  @Prop()
  idUserName: string;
  @Prop()
  totalPrice: number;
  @Prop()
  totalQuantity: number;
  @Prop()
  status: string;

  @Prop([{ _id: false, id: String, quantity: Number }])
  idBooks: { id: string; quantity: number }[];
}

export type OrderDocument = OrderEntity & Document;

export const OrderSchema = SchemaFactory.createForClass(OrderEntity);
