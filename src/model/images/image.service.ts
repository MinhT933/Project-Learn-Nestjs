import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
//---------
@Injectable()
export class ImageService {
  uploadImageToServer(image: Express.Multer.File): string {
    return image.filename;
  }

  removeImageToServer(fileName: string): string {
    try {
      let message = '';
      if (fs.existsSync('public/' + fileName)) {
        fs.unlinkSync('public/' + fileName);
        console.log('remove file success ' + join('public/' + fileName));
        message = 'remove image success ' + fileName;
      }

      return message;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
