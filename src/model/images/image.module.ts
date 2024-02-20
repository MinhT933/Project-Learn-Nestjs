import { Module } from '@nestjs/common';
import { ImagesController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [],
  controllers: [ImagesController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
