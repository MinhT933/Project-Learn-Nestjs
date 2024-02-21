import { ApiProperty } from '@nestjs/swagger';
import { File } from 'buffer';

export class BookDTO {
  @ApiProperty({ type: String })
  bookName: string;
  @ApiProperty({ type: Number })
  price: number;
  @ApiProperty({ type: String })
  author: string;
  @ApiProperty({ type: String })
  typeOfBook: string;
  @ApiProperty()
  file: any;
}
