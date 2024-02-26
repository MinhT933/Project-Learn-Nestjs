import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookEntity, BookSchema } from './book.entity';
import { BookController } from './book.controller';
import { ImageService } from 'src/model/images/image.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookEntity.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService, ImageService],
  exports: [BookService],
})
export class BookModule {}
