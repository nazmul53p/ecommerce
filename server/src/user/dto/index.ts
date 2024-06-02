// src/user/dto/create-user.dto.ts
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

// src/user/dto/update-user.dto.ts
export class UpdateUserDto {
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
}
