import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { ReadPostModule } from './read-post/read-post.module';
import { NotificationModule } from './notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SheetModule } from './sheet/sheet.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'password',
      database: 'dreemz',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    CategoryModule,
    PostModule,
    ReadPostModule,
    NotificationModule,
    SheetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
