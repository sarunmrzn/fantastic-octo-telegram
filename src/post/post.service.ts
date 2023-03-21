import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { Between, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postModel: Repository<Post>,
    private userService: UserService,
    private categoryService: CategoryService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userService.getUserById(createPostDto.postedBy);

    const categories = await this.categoryService.findByIds(
      createPostDto.categories,
    );

    return this.postModel.save({
      name: createPostDto.name,
      postedBy: user,
      categories: categories,
      created_at: createPostDto.created_at,
    });
  }

  async getPostsByCategory(categoryId: number) {
    return this.postModel
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'category')
      .where('category.id = :categoryId', { categoryId })
      .getMany();
  }

  async getPostById(id: number) {
    return this.postModel.findOne({ where: { id } });
  }

  async getUnreadPosts(userId: number) {
    return await this.postModel.query(
      `
        SELECT *
        FROM post p 
        where id NOT IN (
          SELECT rp."postId" 
          FROM read_post rp
          WHERE "userId" = ${userId} 
        )
      `,
    );
  }

  async getPostsCreatedBetweenNowAndOneWeekBefore() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return await this.postModel.find({
      where: { created_at: Between(date, new Date()) },
    });
  }
}
