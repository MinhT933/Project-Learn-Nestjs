import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { DateTime } from 'luxon';

@Schema({
  collection: 'Auction',
  toObject: {
    getters: true,
  },
  versionKey: false,
  timestamps: false,
})
export class AuctionEntity {
  @Prop({ type: String })
  nameAuction: string;

  @Prop({ type: Number })
  startingPrice: number;

  @Prop({ type: Number })
  endPrice: number;

  @Prop({ type: String })
  Status: string;

  @Prop({ type: String, get: parseDate, set: formatDate })
  startTime: Date;

  @Prop({ type: String, get: parseDate, set: formatDate })
  endTime: Date;

  @Prop({ type: String })
  file: any;
}

function parseDate(value: any): Date {
  if (typeof value === 'string') {
    const dateTime = DateTime.fromFormat(value, 'dd-MM-yyyyTHH:mm:ss');
    if (dateTime.isValid) {
      return dateTime.toJSDate();
    }
  }
  return value;
}

function formatDate(value: any): string {
  if (value instanceof Date) {
    return DateTime.fromJSDate(value).toFormat('dd-MM-yyyyTHH:mm:ss');
  }
  return value;
}

export type AuctionDocument = AuctionEntity & Document;

export const AuctionSchema = SchemaFactory.createForClass(AuctionEntity);
