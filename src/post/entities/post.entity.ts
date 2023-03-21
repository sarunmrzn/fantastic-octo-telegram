import { Category } from 'src/category/entities/category.entity';
import { ReadPost } from 'src/read-post/entities/read-post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.posts)
  postedBy: User;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => ReadPost, (readPost) => readPost.user)
  postReads: ReadPost[];

  @Column({ default: new Date() })
  created_at: Date;
}
