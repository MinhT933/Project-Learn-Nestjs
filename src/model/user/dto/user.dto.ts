import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ type: String, default: 'minht' })
  username: string;
  @ApiProperty({ type: String, default: '123' })
  password: string;
  @ApiProperty({ type: String, default: 'admin' })
  role: string;
}
