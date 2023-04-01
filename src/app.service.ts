import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getLowestMissingNumber(nums: number[]) {
    for (let i = 0; i <= nums.length; i++) {
      if (!nums.includes(i)) return i;
    }
  }
}
