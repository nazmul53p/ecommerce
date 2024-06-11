import { Permission } from 'auth/permission/entities/permission.entity';
import { Role } from 'auth/role/entities/role.entity';

export interface UserAndRequest extends Request {
  user: {
    id: number;
    name: string;
    email: string;
    isSuperAdmin: number;
    role: Role & { permissions: Permission[] };
  };
}
