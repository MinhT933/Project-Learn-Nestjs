import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { join } from 'path';
import * as firebase from 'firebase-admin';
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

  async uploadImagetoFirebase(image: Express.Multer.File): Promise<String> {
    try {
      const uuid = randomUUID();
      const imageName = image.originalname.split('.');

      const newImageName = uuid + '.' + imageName[imageName.length - 1];
      const url = `images/${newImageName}`;

      const bucket = firebase.storage().bucket();
      const file = bucket.file(url);
      const contents = image.buffer;
      await file.save(contents);

      return await `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(url)}?alt=media`;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
