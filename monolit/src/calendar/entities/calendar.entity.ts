import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

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

    @Column({ type: 'int', default: 2 })
    permission: number; // Adiciona a coluna de permissão

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

  @Column({ type: 'int', nullable: false })
  viewer_id?: number; // Adiciona a coluna viewerId

  @ManyToOne(() => User, user => user.events)
  @JoinColumn({ name: 'user_id' }) // Especifica o nome da coluna de junção
  user: User;
}