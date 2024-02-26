import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const imageRes = this.uploadImagetoFirebase(image);
    const book = new this.bookModule({ ...dto, file: imageRes });
    return await book.save();
  }

  async updeteBook(id: string, dto: BookDTO, file: Express.Multer.File) {
    this.removeImageByIdBook(id);
    try {
      const imageRes = this.uploadImagetoFirebase(file);
      const Book = await this.bookModule.findByIdAndUpdate(
        { _id: id },
        { ...dto, file: imageRes },
        {
          new: true,
        },
      );
      if (Book) {
        return Book;
      } else {
        throw new NotFoundException('Không tìm thấy cuốn sách này');
      }
    } catch (error) {
      throw new BadRequestException('ko xóa được ảnh');
    }
  }

  async getAll() {
    return await this.bookModule.find().lean();
  }

  async removeImageByIdBook(id: string) {
    try {
      const ImageBooktoRemove = await this.bookModule.findById(id);
      const image = ImageBooktoRemove.file;

      this.removeImageInFirebase(image);
    } catch (error) {
      throw error;
    }
  }
}
