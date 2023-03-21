import { PartialType } from '@nestjs/mapped-types';
import { CreateReadPostDto } from './create-read-post.dto';

export class UpdateReadPostDto extends PartialType(CreateReadPostDto) {}
