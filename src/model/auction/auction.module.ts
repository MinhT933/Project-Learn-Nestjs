import { Module } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { ImageService } from '../images/image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionEntity, AuctionSchema } from './auction.entity';
import { AuctionCronService } from './autionCron.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuctionEntity.name, schema: AuctionSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AuctionController],
  providers: [AuctionService, ImageService, AuctionCronService],
  exports: [AuctionService],
})
export class AuctionModule {}
