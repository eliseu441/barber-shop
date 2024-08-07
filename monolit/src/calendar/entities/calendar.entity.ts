import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Event, event => event.user)
    events: Event[];
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column()
  start: Date;

  @Column()
  end_time: Date;

  @Column({ length: 500, nullable: true })
  description?: string;

  @ManyToOne(() => User, user => user.events)
  user: User;
}