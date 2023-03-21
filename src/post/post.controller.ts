import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get('/category/:categoryId')
  getPostsByCategoryId(@Param() param: { categoryId: number }) {
    return this.postService.getPostsByCategory(param.categoryId);
  }

  @Get('/unread/:userId')
  getUnreadPosts(@Param() param: { userId: number }) {
    return this.postService.getUnreadPosts(param.userId);
  }
}
