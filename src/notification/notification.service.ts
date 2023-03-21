import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as admin from 'firebase-admin';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationService {
  private readonly fcm: admin.messaging.Messaging;

  constructor(
    /* private postService: PostService, */
    private userService: UserService,
  ) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(), // replace this with firebase credentials
      projectId: '',
    });

    this.fcm = admin.messaging();
  }

  /* @Cron('* * * * * * ') */
  @Cron('0 0 * * 0') // Start of every week
  async sendNotifications() {
    const users = await this.userService.getAllNotificationTurnedOnUsers();
    /* const newPostsForThisWeek = */
    /*   await this.postService.getPostsCreatedBetweenNowAndOneWeekBefore(); */

    users.forEach(async (user) => {
      const message: admin.messaging.Message = {
        notification: {
          title: 'New Post Notification',
          body: 'You have new posts to read.',
        },
        token: user.fcmToken,
      };
      console.log(`Message sent to: ${user.username}`);

      await this.fcm.send(message);
    });
  }
}
