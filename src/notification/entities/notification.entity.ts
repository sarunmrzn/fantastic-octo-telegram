import { Post } from 'src/post/entities/post.entity';
import { PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Post)
  @JoinColumn()
  post: Post;
}
