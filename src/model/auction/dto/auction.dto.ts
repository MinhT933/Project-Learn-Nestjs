import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { DateTimeTransformer } from '../../util/datetime';

export class AuctionDto {
  @ApiProperty({ type: String })
  nameAuction: string;

  @ApiProperty({ type: Number })
  startingPrice: number;

  @ApiProperty({ type: Number })
  endPrice: number;

  @ApiProperty({ type: String })
  Status: string;

  @ApiProperty({ type: Date })
  @IsDate()
  @Transform(({ value }) => DateTimeTransformer.fromJSDate(value), { toClassOnly: true })
  @Transform(({ value }) => value.toJSDate(), { toPlainOnly: true })

  @ApiProperty({ type: Date })
  @IsDate()
  @Transform(({ value }) => DateTimeTransformer.from(value), { toClassOnly: true })
  @Transform(({ value }) => DateTimeTransformer.to(value), { toPlainOnly: true })
  endTime: DateTime;

  @ApiProperty()
  file: any;
}
