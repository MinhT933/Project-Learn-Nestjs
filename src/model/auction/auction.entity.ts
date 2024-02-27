import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

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
  @Prop({ type: Date })
  startTime!: Date;
  @Prop({ type: Date  })
  endTime: Date;
  @Prop({type:String})
  file: any;
}


export type AuctionDocumnet = AuctionEntity & Document;

export const AuctionSchema = SchemaFactory.createForClass(AuctionEntity)
