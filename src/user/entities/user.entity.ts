import { Post } from 'src/post/entities/post.entity';
import { ReadPost } from 'src/read-post/entities/read-post.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  fcmToken?: string;

  @OneToMany(() => Post, (post) => post.postedBy)
  posts: Post[];

  @OneToMany(() => ReadPost, (readPost) => readPost.user)
  postReads: ReadPost[];

  @Column({ default: false })
  notificationDisabled?: boolean;
}
