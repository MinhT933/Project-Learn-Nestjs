import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const HandeImage = (req, file: Express.Multer.File, callback) => {
  const pattern = /(jpg|jpeg|png|gif)$/;
  if (!pattern.test(file.mimetype)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file: Express.Multer.File, callback) => {
  let url = '';
  const fileExtName = extname(file.originalname);
  const fileName = `${uuidv4()}${fileExtName}`;
  if (file.originalname === 'blob') {
    url = `${fileName}.${file.mimetype.split('/')[1]}`;
  } else {
    url = `${fileName}`;
  }

  callback(null, url);
};
