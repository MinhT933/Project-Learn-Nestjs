import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuctionEntity } from './auction.entity';
import { Model } from 'mongoose';
import { AuctionDto } from './dto/auction.dto';
import { ImageService } from '../images/image.service';

@Injectable()
export class AuctionService extends ImageService {
  constructor(
    @InjectModel(AuctionEntity.name)
    private autionModule: Model<AuctionEntity>,
  ) {
    super();
  }

  async createAution(dto: AuctionDto, image: Express.Multer.File) {
    const imageRes = this.uploadImageToServer(image);
    const aucTion = new this.autionModule({ ...dto, file: imageRes });
    return await aucTion.save();
  }
}
