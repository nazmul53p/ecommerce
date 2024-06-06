import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Menu } from 'menu/entities/menu.entity';

export class CreateMenuDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ example: 'Home' })
  @IsString()
  name: string;

  @ApiProperty({ example: null })
  @IsOptional()
  parent: Menu;

  @ApiProperty({ example: [1, 2] })
  @IsArray()
  @IsOptional()
  permissions: number[];
}
