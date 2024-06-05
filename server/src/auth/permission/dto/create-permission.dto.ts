import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'create',
  })
  @IsString()
  permissionName: string;
}