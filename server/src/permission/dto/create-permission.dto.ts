import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'The name of the permission',
    example: 'create:role',
  })
  @IsString()
  permissionName: string;
}
