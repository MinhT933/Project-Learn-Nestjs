import { ApiProperty } from '@nestjs/swagger';

export class BookDTO {
  @ApiProperty({ type: String })
  BookName: string;
  @ApiProperty({ type: Number, default: '0000d' })
  price: number;
  @ApiProperty({ type: String })
  Author: String;
  @ApiProperty({ type: String })
  TypeOfBook: String;
  @ApiProperty({ type: String })
  NameFileImage: String;
}
