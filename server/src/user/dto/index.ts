import { ApiProperty } from '@nestjs/swagger';
// src/user/dto/create-user.dto.ts
export class CreateUserDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
}

// src/user/dto/update-user.dto.ts
export class UpdateUserDto {
  @ApiProperty()
  readonly name?: string;
  @ApiProperty()
  readonly email?: string;
  @ApiProperty()
  readonly password?: string;
}
