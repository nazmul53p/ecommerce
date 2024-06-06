import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'auth/role/entities/role.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleRepository.findOne({
      where: {
        id: createUserDto.roleId,
      },
    });

    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = role;
    return this.userRepository.save(user);
  }

  async showById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
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
