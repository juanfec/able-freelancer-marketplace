import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(data: Partial<User>) {
    this.logger.log(`Creating user with email: ${data.email}`);
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  findAll() {
    this.logger.log('Fetching all users');
    return this.userRepository.find();
  }

  findOne(id: number) {
    this.logger.log(`Fetching user with id: ${id}`);
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<User>) {
    this.logger.log(`Updating user with id: ${id}`);
    return this.userRepository.update(id, data);
  }

  remove(id: number) {
    this.logger.log(`Deleting user with id: ${id}`);
    return this.userRepository.delete(id);
  }
}
