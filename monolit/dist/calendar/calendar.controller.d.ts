import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
export declare class CalendarController {
    private readonly calendarService;
    constructor(calendarService: CalendarService);
    create(createCalendarDto: CreateCalendarDto): Promise<import("./entities/calendar.entity").Event>;
    getAllCalendar(): Promise<{
        title: string;
        start: Date;
        end: Date;
        description: string;
        user_id: number;
    }[]>;
    createUser(createUserDto: CreateUserDto): Promise<import("./entities/calendar.entity").User>;
    findUser(findUserDto: FindUserDto): Promise<import("./entities/calendar.entity").User>;
}
