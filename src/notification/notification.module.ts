import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { NotificationService } from './notification.service';

@Module({
  imports: [PostModule, UserModule],
  providers: [NotificationService],
})
export class NotificationModule {}
