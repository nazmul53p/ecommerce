import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Permission> {
    return this.permissionService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.permissionService.remove(id);
  }
}
