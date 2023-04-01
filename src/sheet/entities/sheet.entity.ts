import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  columns: number;

  @Column()
  rows: number;

  @Column('jsonb', { nullable: true })
  data?: any;
}
