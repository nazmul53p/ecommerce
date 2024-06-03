import { Role } from 'role/entities/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  permissionName: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
