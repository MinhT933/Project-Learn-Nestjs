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
  bookName: string;
  @Prop({ type: Number })
  price: number;
  @Prop({ type: String })
  author: string;
  @Prop({ type: String })
  typeOfBook: string;
  @Prop({ type: String })
  file: any;
}

export type BookDocument = BookEntity & Document;

export const BookSchema = SchemaFactory.createForClass(BookEntity);
