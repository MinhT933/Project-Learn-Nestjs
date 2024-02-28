import {
  BadGatewayException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuctionDto } from './dto/auction.dto';

@Controller('auction')
@ApiTags('Auction')
export class AuctionController {
  constructor(private auctionService: AuctionService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nameAuction: { type: 'string' },
        startingPrice: { type: 'number' },
        endPrice: { type: 'number' },
        startTime: { type: 'Date' },
        endTime: { type: 'Date' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async creatAution(
    @Body() dto: AuctionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return await this.auctionService.createAuction(dto, file);
    } catch (error) {
      throw new BadGatewayException({
        message: error.message,
      });
    }
  }
}
