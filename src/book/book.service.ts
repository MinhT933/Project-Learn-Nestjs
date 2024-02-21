import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookEntity } from './book.entity';
import { Model } from 'mongoose';
import { BookDTO } from './dto/book.dto';
import { ImageService } from 'src/model/images/image.service';

@Injectable()
export class BookService extends ImageService {
  constructor(
    @InjectModel(BookEntity.name)
    private bookModule: Model<BookEntity>,
  ) {
    super();
  }

  async createBook(dto: BookDTO, image: Express.Multer.File) {
    const imageRes = await this.uploadImagetoFirebase(image);
    console.log('🚀 ~ BookService ~ createBook ~ imageRes:', imageRes);
    const book = new this.bookModule({ ...dto, file: imageRes });
    return await book.save();
  }
  async getAll() {
    return await this.bookModule.find().lean();
  }
}
