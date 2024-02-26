import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { TypeOrder } from 'src/model/util/contanst';

class BookDTO {
  @ApiProperty({ type: String, default: '' })
  id: string;

  @ApiProperty({ type: Number, default: 0 })
  quantity: number;
}

export class OrderDTO {
  @ApiProperty({ type: String, default: 'em' })
  idUserName: string;

  @ApiProperty({ type: Number })
  totalPrice: number;

  @ApiProperty({ type: Number })
  totalQuantity: number;
  @ApiProperty({ type: String, default: TypeOrder.PENDING })
  status: string;

  @ApiProperty({ type: [BookDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookDTO)
  idBooks: BookDTO[];
}

export class PaymentDTO extends PickType(OrderDTO, ['totalPrice', 'status']) {}
