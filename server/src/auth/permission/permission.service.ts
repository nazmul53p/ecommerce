import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = new Permission();
    Object.assign(permission, createPermissionDto);
    await permission.save();
    return permission;
  }

  async findAll(): Promise<Permission[]> {
    return await Permission.find();
  }

  findOne(id: number): Promise<Permission> {
    return Permission.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateData: Partial<Permission>,
  ): Promise<Permission> {
    const permission = await Permission.findOne({
      where: {
        id,
      },
    });
    Object.assign(permission, updateData);
    await permission.save();
    return permission;
  }

  async remove(id: number): Promise<void> {
    const permission = await Permission.findOne({
      where: {
        id,
      },
    });
    await permission.remove();
  }
}
