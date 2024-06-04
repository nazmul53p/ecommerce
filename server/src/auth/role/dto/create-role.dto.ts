import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @ApiProperty({
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayUnique()
  @IsOptional()
  users?: number[];

  @ApiProperty({
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayUnique()
  @IsOptional()
  permissions?: number[];
}
