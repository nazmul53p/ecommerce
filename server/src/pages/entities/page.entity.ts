// name, icon, link, children, permissions

import { Menu } from 'menu/entities/menu.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  slug: string;

  @Column()
  title: string;

  @Column()
  sub_title: string;

  @OneToOne(() => Menu, (menu) => menu.id, { nullable: true })
  @JoinColumn()
  menu: Menu;

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
