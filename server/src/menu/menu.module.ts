import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'auth/permission/entities/permission.entity';
import { User } from 'auth/user/user.entity';
import { Menu } from './entities/menu.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, User, Permission])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
