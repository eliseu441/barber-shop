import { Repository } from 'typeorm';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, Event } from './entities/calendar.entity';
export declare class CalendarService {
    private readonly eventRepository;
    private readonly userRepository;
    constructor(eventRepository: Repository<Event>, userRepository: Repository<User>);
    createCalendar(createCalendarDto: CreateCalendarDto): Promise<Event>;
    findAllCalendar(): Promise<{
        title: string;
        start: Date;
        end: Date;
        description: string;
        user_id: number;
    }[]>;
    viewCalendar(id: number): Promise<Event>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
}
