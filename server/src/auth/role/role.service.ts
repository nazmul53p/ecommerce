import { Injectable } from '@nestjs/common';
import { Permission } from 'auth/permission/entities/permission.entity';
import { User } from 'auth/user/user.entity';
import { In } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { roleName, users, permissions } = createRoleDto;
    const role = new Role();
    role.roleName = roleName;

    try {
      role.users = users ? await User.findBy({ id: In(users) }) : [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users.');
    }

    try {
      role.permissions = permissions
        ? await Permission.findBy({ id: In(permissions) })
        : [];
    } catch (error) {
      console.error('Error fetching permissions:', error);
      throw new Error('Failed to fetch permissions.');
    }

    console.log('Role to be saved:', role);
    console.log('Users:', role.users);
    console.log('Permissions:', role.permissions);

    try {
      return await Role.save(role);
    } catch (error) {
      console.error('Error saving role:', error);
      throw new Error('Failed to save role.');
    }
  }

  async findAll() {
    const roles = await Role.find();
    return roles;
  }

  async findOne(id: number) {
    const role = await Role.findOne({
      where: {
        id,
      },
    });
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await Role.findOne({
      where: {
        id,
      },
    });
    Object.assign(role, updateRoleDto);
    role.save();
    return role;
  }

  async remove(id: number) {
    const role = await Role.findOne({
      where: {
        id,
      },
    });
    await role.remove();
  }
}
