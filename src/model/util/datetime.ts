import { Type } from 'class-transformer';
import { IsDate, Validate } from 'class-validator';
import { DateTime } from 'luxon';



export class DateTimeTransformer {
  static from(value: any): Date {
    if (value instanceof Date) {
      return value;
    } else if (typeof value === 'string') {
      return new Date(value);
    }
    return value;
  }

  static to(value: any): Date {
    return value instanceof Date ? value.toISOString() : value;
  }
}
