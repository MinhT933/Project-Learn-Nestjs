import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { BookDTO } from './dto/book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesController } from 'src/model/images/image.controller';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bookName: { type: 'string' },
        price: { type: 'number' },
        author: { type: 'string' },
        typeOfBook: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async createBook(
    @Body() dto: BookDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      console.log('ko lỗi');

      return await this.bookService.createBook(dto, file);
    } catch (error) {
      console.log('lỗi ơ');
      throw new BadGatewayException({
        message: error.message,
      });
    }
  }
  @Get()
  async getList() {
    return this.bookService.getAll();
  }
}
