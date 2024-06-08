import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { AccessRoles } from 'auth/role/role.decorator';
import { RoleGuard } from 'auth/role/role.guard';
import { UserAndRequest } from 'types';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiBearerAuth()
  @AccessRoles(['admin'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(
    @Req() req: UserAndRequest,
    @Body() createRoleDto: CreateMenuDto,
  ) {
    try {
      await this.menuService.create(createRoleDto);
      return {
        success: true,
        message: 'Menu Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  @ApiBearerAuth()
  @AccessRoles(['admin'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findAll() {
    try {
      const menus = await this.menuService.findAll();
      return {
        success: true,
        data: menus,
        message: 'Menu Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @ApiBearerAuth()
  @AccessRoles(['admin'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const menu = await this.menuService.findOne(+id);
      return {
        success: true,
        data: menu,
        message: 'Menu Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @ApiBearerAuth()
  @AccessRoles(['admin'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @ApiBearerAuth()
  @AccessRoles(['admin'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
