import { Module } from '@nestjs/common';
import { ReadPostService } from './read-post.service';
import { ReadPostController } from './read-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadPost } from './entities/read-post.entity';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReadPost]), UserModule, PostModule],
  controllers: [ReadPostController],
  providers: [ReadPostService],
  exports: [ReadPostService],
})
export class ReadPostModule {}
