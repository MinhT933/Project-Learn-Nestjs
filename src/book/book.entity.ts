import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'Book',
  toObject: {
    getters: true,
  },
  versionKey: false,
  timestamps: false,
})
export class BookEntity {
  @Prop({ type: String })
  BookName: string;
  @Prop({ type: Number, default: '0000$' })
  price: number;
  @Prop({ type: String })
  Author: String;
  @Prop({ type: String })
  TypeOfBook: String;
  @Prop({ type: String })
  NameFileImage: String;
}

export type BookDocument = BookEntity & Document;

export const BookSchema = SchemaFactory.createForClass(BookEntity);
