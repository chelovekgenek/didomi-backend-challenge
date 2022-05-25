import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Event } from './event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Event, (event) => event.user, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  consents: Event[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
