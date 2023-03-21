import { Controller, Post, Param, Delete } from '@nestjs/common';
import { ReadPostService } from './read-post.service';

@Controller('read-post')
export class ReadPostController {
  constructor(private readonly readPostService: ReadPostService) {}

  @Post('/:id/:userId')
  readPost(@Param() param: { id: number; userId: number }) {
    return this.readPostService.readPost(param.id, param.userId);
  }
  @Delete('/reset-read-posts/:userId')
  resetReadPosts(@Param() param: { userId: number }) {
    return this.readPostService.deleteUserReadPosts(param.userId);
  }
}
