import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HandeImage, editFileName } from '../util/image';
import { ApiFile } from 'src/decorator/file.decorator';
import { Public } from '../util/contanst';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@ApiTags('image')
@Controller('image')
export class ImagesController {
  constructor(private imageService: ImageService) {}
  @ApiFile()
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: HandeImage,
    }),
  )
  async testImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|gif)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.imageService.uploadImageToServer(file);
  }

  @Public()
  @Get(':fileName')
  getFile(
    @Res({ passthrough: true }) res: Response,
    @Param('fileName') fileName: string,
  ): StreamableFile {
    const file = createReadStream(join(process.cwd(), `/public/${fileName}`));
    res.set({
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'public,max-age=604800',
      'Content-Type': 'image/png',
    });
    return new StreamableFile(file);
  }
}
