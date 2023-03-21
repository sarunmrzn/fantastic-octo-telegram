import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { ReadPost } from './entities/read-post.entity';

@Injectable()
export class ReadPostService {
  constructor(
    @InjectRepository(ReadPost)
    private readonly postReadRepository: Repository<ReadPost>,
    private postService: PostService,
    private userService: UserService,
  ) {}

  async readPost(postId: number, userId: number) {
    const post = await this.postService.getPostById(postId);
    const user = await this.userService.getUserById(userId);
    const postRead = await this.postReadRepository.findOne({
      where: {
        post,
        user,
      },
    });
    if (postRead) {
      postRead.readAt = new Date();
      await this.postReadRepository.save(postRead);
    } else {
      const newPostRead = this.postReadRepository.create({
        post,
        user,
      });
      await this.postReadRepository.save(newPostRead);
    }
    return this.postReadRepository.findOne({
      where: {
        post,
        user,
      },
    });
  }

  async deleteUserReadPosts(userId: number) {
    const user = await this.userService.getUserById(userId);
    const readPosts = await this.postReadRepository.find({ where: { user } });
    readPosts.forEach((rp) => this.postReadRepository.delete(rp.id));
    return 'Deleted User Read Posts successfully';
  }
}
