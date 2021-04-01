import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FindResourcePipe implements PipeTransform {
  transform(value: any) {
    if (Object.keys(value).length) return value;

    throw new BadRequestException();
  }
}
