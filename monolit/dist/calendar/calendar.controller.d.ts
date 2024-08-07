import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
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
}
