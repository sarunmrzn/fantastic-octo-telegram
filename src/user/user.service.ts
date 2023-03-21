import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

const users = [
  {
    username: 'sarun',
  },
  {
    username: 'sarun0 ',
  },
  {
    username: 'sarun1',
  },
  {
    username: 'sarun2',
  },
];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}

  seedUsers() {
    return this.userModel.save(users);
  }

  getUserById(id: number) {
    return this.userModel.findOne({ where: { id } });
  }

  getUserWithRelations(id: number, relations: string[]) {
    return this.userModel.findOne({ where: { id }, relations });
  }

  getAllNotificationTurnedOnUsers() {
    return this.userModel.find({ where: { notificationDisabled: false } });
  }
}
