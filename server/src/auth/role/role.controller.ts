import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAndRequest } from 'types';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(
    @Req() req: UserAndRequest,
    @Body() createRoleDto: CreateRoleDto,
  ) {
    try {
      await this.roleService.create(createRoleDto);
      return {
        success: true,
        message: 'Role Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.roleService.findAll();
      return {
        success: true,
        data,
        message: 'Permissions Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const data = await this.roleService.findOne(+id);
      return {
        success: true,
        data,
        message: 'Role Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      await this.roleService.update(+id, updateRoleDto);
      return {
        success: true,
        message: 'Role Updated Successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.message,
      };
    }
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.roleService.remove(+id);
      return {
        success: true,
        message: 'Role Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
