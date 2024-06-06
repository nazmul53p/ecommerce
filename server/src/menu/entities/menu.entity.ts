// name, icon, link, children, permissions

import { Permission } from 'auth/permission/entities/permission.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Menu, (menu) => menu.id, { nullable: true })
  parent: Menu;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'menu_has_permissions',
    joinColumn: {
      name: 'menu_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
