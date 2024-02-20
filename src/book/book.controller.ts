import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { BookDTO } from './dto/book.dto';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Post()
  async createBook(@Body() dto: BookDTO) {
    try {
      return await this.bookService.createBook(dto);
    } catch (error) {
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
