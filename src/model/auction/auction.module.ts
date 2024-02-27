import { Module } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { ImageService } from '../images/image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionEntity, AuctionSchema } from './auction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuctionEntity.name, schema: AuctionSchema },
    ]),
  ],
  controllers: [AuctionController],
  providers: [AuctionService, ImageService],
  exports: [AuctionService],
})
export class AuctionModule {}
