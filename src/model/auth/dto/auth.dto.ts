import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty({ type: String, default: 'minht' })
  username: string;

  @ApiProperty({ type: String, default: '123' })
  password: string;
}
