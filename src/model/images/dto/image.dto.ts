import { ApiProperty } from '@nestjs/swagger';

export class ImagesUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
