import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export enum TypeOrder {
  PENDING = 'PENDING',
  ALREADY_PAID = 'ALREADY_PAID',
  CANCEL = 'CANCEL',
}

export enum typeAuction {
  PENDING= 'PENDING',
  START='START',
  ENDING='ENDING',
}