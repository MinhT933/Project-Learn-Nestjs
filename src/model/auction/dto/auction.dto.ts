import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { DateTime } from 'luxon';

export class AuctionDto {
  constructor(data?: Partial<AuctionDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  @ApiProperty({ type: String })
  nameAuction: string;

  @ApiProperty({ type: Number })
  startingPrice: number;

  @ApiProperty({ type: Number })
  endPrice: number;

  @ApiProperty({ type: String })
  Status: string;

  @Transform(({ value }) => DateTime.fromISO(value).toJSDate())
  startTime: Date;

  @Transform(({ value }) => DateTime.fromISO(value).toJSDate())
  endTime: Date;

  @ApiProperty()
  file: any;
}
