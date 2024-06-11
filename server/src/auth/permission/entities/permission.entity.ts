import { Role } from 'auth/role/entities/role.entity';
import { Menu } from 'menu/entities/menu.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  slug: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];

  @ManyToMany(() => Menu, (menu) => menu.permissions)
  menus: Menu[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  createBy: number;

  @Column({ default: 0 })
  updateBy: number;

  @Column({ default: 1 })
  status: number;

  @BeforeInsert()
  async generatorSlug() {
    this.slug = this.name.toLowerCase().replace(/ /g, '-');
  }
}
