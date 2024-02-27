import { Type } from 'class-transformer';
import { IsDate, Validate } from 'class-validator';
import { DateTime } from 'luxon';

export class DateTimeTransformer {
  to(value: DateTime): Date {
    return value.toJSDate();
  }

  from(value: Date): DateTime {
    return DateTime.fromJSDate(value);
  }
}