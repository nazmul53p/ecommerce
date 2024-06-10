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
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionService } from './permission.service';

// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(
    @Req() req: UserAndRequest,
    @Body() createPermissionDto: CreatePermissionDto,
  ) {
    try {
      createPermissionDto.createBy = req.user.id || 0;
      await this.permissionService.create(createPermissionDto);
      return {
        success: true,
        message: 'Permission Created Successfully',
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
      const data = await this.permissionService.findAll();
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
      const data = await this.permissionService.findOne(+id);
      return {
        success: true,
        data,
        message: 'Permission Fetched Successfully',
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
  async update(
    @Req() req: UserAndRequest,
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    try {
      updatePermissionDto.updateBy = req.user.id || 0;
      await this.permissionService.update(+id, updatePermissionDto);
      return {
        success: true,
        message: 'Permission Updated Successfully',
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
      await this.permissionService.remove(+id);
      return {
        success: true,
        message: 'Permission Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
