import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { User, Event } from './entities/calendar.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createCalendar(createCalendarDto: CreateCalendarDto): Promise<Event> {
    // Verifica se o usuário existe
    const user = await this.userRepository.findOneBy({ id: createCalendarDto.user_id });
    if (!user) {
      throw new Error(`User with id ${createCalendarDto.user_id} not found`);
    }

    // Obtém o nome do usuário
    const userName = user.name;

    // Concatena o nome do usuário ao título
    const titleWithUserName = `${userName} - ${createCalendarDto.title}`;

    // Consulta SQL para inserir o evento
    const query = `
      INSERT INTO event (title, start, end_time, description, user_id, viewer_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      titleWithUserName,
      createCalendarDto.start,
      createCalendarDto.end_time,
      createCalendarDto.description,
      createCalendarDto.user_id,
      createCalendarDto.viewer_id,
    ];

    console.log('Inserting event with values:', values);

    // Executa a consulta SQL
    const result = await this.eventRepository.query(query, values);
    return result[0];
  }


  async findAllCalendar(): Promise<{ title: string; start: Date; end: Date; description: string; user_id: number }[]> {
    const events = await this.eventRepository.find({ relations: ['user'] });
  
    return events.map(event => ({
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end_time),
      description: event.description,
      user_id: event.user.id,
      viewer_id: event.viewer_id,
    }));
  }

  viewCalendar(id: number): Promise<Event> {
    return this.eventRepository.findOneBy({ id });
  }

}