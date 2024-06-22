import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'auth/permission/entities/permission.entity';
import { In, Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = new Menu();
    menu.name = createMenuDto.name;

    if (createMenuDto.parent.id) {
      const parent = await this.menuRepository.findOne({
        where: { id: createMenuDto.parent.id },
      });
      if (parent) {
        menu.parent = parent;
      }
    }
    menu.permissions = await this.permissionRepository.find({
      where: {
        id: In(createMenuDto.permissions),
      },
    });
    return this.menuRepository.save(menu);
  }

  findAll() {
    return this.menuRepository.find({
      relations: ['permissions', 'parent', 'children'],
    });
  }

  findOne(id: number) {
    return this.menuRepository.findOne({
      where: { id },
      relations: ['permissions', 'parent', 'children'],
    });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    menu.name = updateMenuDto.name;
    if (updateMenuDto.parent.id) {
      const parent = await this.menuRepository.findOne({
        where: { id: updateMenuDto.parent.id },
      });
      if (parent) {
        menu.parent = parent;
      }
    }
    menu.permissions = await this.permissionRepository.find({
      where: {
        id: In(updateMenuDto.permissions),
      },
    });
    return this.menuRepository.save(menu);
  }

  remove(id: number) {
    return this.menuRepository.delete(id);
  }
}
