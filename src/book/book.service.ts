import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookEntity } from './book.entity';
import { Model } from 'mongoose';
import { BookDTO } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(BookEntity.name)
    private bookModule: Model<BookEntity>,
  ) {}

  async createBook(dto: BookDTO) {
    const book = new this.bookModule(dto);
    return await book.save();
  }
  async getAll() {
    return await this.bookModule.find().lean( );
  }
}
