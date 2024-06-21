// name, icon, link, children, permissions

import { Permission } from 'auth/permission/entities/permission.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  link: string;

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
  async generatorLinkIfUserNotGiven() {
    if (this.link) return;
    this.link = `/${this.name.toLowerCase().replace(/ /g, '-')}`;
  }

  @BeforeInsert()
  async generatorSlug() {
    this.slug = this.name.toLowerCase().replace(/ /g, '-');
  }
}
