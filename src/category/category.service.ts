import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

const categories = [
  {
    name: 'Uno',
  },
  {
    name: 'Duo',
  },
  {
    name: 'Tres',
  },
  {
    name: 'Quatro',
  },
  {
    name: 'Sinco',
  },
];

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryModel: Repository<Category>,
  ) {}
  seedCategories() {
    return this.categoryModel.save(categories);
  }

  findByIds(ids: number[]) {
    return this.categoryModel.find({ where: { id: In(ids) } });
  }

  findById(id: number) {
    return this.categoryModel.findOne({ where: { id } });
  }
}
