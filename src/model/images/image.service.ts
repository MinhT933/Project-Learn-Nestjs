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
import * as path from 'path';
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

  uploadImagetoFirebase(image: Express.Multer.File) {
    try {
      const uuid = randomUUID();
      const imageName = image.originalname.split('.');

      const newImageName = uuid + '.' + imageName[imageName.length - 1];
      const url = `images/${newImageName}`;

      const bucket = firebase.storage().bucket();
      const file = bucket.file(url);
      const contents = image.buffer;
      file.save(contents);

      return `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(url)}?alt=media`;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async removeImageInFirebase(fileName: string): Promise<void> {
    try {
      const fileNameWithoutQuery = fileName.split('?')[0];
      const fileNameWithoutProtocol = fileNameWithoutQuery.replace(
        /(^\w+:|^)\/\//,
        '',
      );
      const fileNameWithoutBucket = fileNameWithoutProtocol.replace(
        `${firebase.storage().bucket().name}.`,
        '',
      );
      const filePath = decodeURIComponent(path.basename(fileNameWithoutBucket));
      const bucket = firebase.storage().bucket();
      await bucket.file(filePath).delete();
    } catch (error) {
      console.log('🚀 ~ ImageService ~ removeImageInFirebase ~ error:', error);
      throw new Error('Failed to delete image');
    }
  }
}
