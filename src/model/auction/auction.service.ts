import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuctionEntity } from './auction.entity';
import { Model } from 'mongoose';
import { AuctionDto } from './dto/auction.dto';
import { ImageService } from '../images/image.service';
import { typeAuction } from '../util/contanst';
import * as moment from 'moment';

@Injectable()
export class AuctionService extends ImageService {
  constructor(
    @InjectModel(AuctionEntity.name)
    private autionModule: Model<AuctionEntity>,
  ) {
    super();
  }

  async createAuction(dto: AuctionDto, image: Express.Multer.File) {
    const imageRes = this.uploadImagetoFirebase(image);
    const auction = new this.autionModule({ ...dto, file: imageRes });
    const startTime = moment(auction.startTime, 'DD/MM/YYYYTHH:mm:ss').toDate();
    const endTime = moment(auction.endTime, 'DD/MM/YYYYTHH:mm:ss').toDate();
    const nowDate = new Date();
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
    return await auction.save();
  }
}
