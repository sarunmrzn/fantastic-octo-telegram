import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  name: string;

  @IsNumber()
  postedBy: number;

  @IsNumber({}, { each: true })
  categories: number[];

  @IsDateString()
  created_at: string;
}
