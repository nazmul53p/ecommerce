import { Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    Object.assign(user, createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await User.findOne(id as FindOneOptions<User>);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}
