import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuctionService } from './auction.service';
import { Model } from 'mongoose';
import { AuctionEntity } from './auction.entity';
import { AuctionDto } from './dto/auction.dto';
import * as moment from 'moment';
import { typeAuction } from '../util/contanst';
import { InjectModel } from '@nestjs/mongoose';
import { timeout } from 'rxjs';

@Injectable()
export class AuctionCronService {
  constructor(
    @InjectModel(AuctionEntity.name)
    private auctionModel: Model<AuctionEntity>,
  ) {}

  @Cron('0 1 * * * *') // Run every 3 seconds
  async handleAuctionStart() {
    try {
      console.log('Running auction start cron job after 30s');
      const auctions = await this.auctionModel.find().exec(); // Fetch all auctions

      const nowDate = new Date();

      auctions.forEach((auction) => {
        const startTime = moment(
          auction.startTime,
          'DD/MM/YYYYTHH:mm:ss',
        ).toDate();
        const endTime = moment(auction.endTime, 'DD/MM/YYYYTHH:mm:ss').toDate();

        if (startTime > nowDate && endTime > nowDate) {
          auction.Status = typeAuction.PENDING;
        } else if (startTime === nowDate && startTime < endTime) {
          auction.Status = typeAuction.START;
        } else if (startTime < nowDate && endTime < nowDate) {
          auction.Status = typeAuction.ENDING;
        } else if (startTime > nowDate && endTime < nowDate) {
          auction.Status = typeAuction.START;
        } else if (nowDate > endTime) {
          auction.Status = typeAuction.ENDING;
        } else if (startTime < nowDate && endTime > nowDate) {
          auction.Status = typeAuction.START;
        }
      });

      await Promise.all(auctions.map((auction) => auction.save())); // Save all modified auctions
    } catch (error) {
      console.log('Error running auction start cron job:', error);
    }
  }
}
