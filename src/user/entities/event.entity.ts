import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Unique,
} from 'typeorm';

import { NotificationType } from '../dtos';
import { User } from './user.entity';

@Entity()
@Unique(['type', 'user'])
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  enabled: boolean;

  @Column({ enum: NotificationType })
  type: NotificationType;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
