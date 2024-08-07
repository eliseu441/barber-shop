import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
//import { AuthService } from '../auth/auth.service';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) { }

  /* @Get('/getAllSchedules')
   getBCbuilds() {
     return this.calendarService.getBCbuilds();
   }
 */
  // @UseGuards(JwtAuthGuard)
  @Post('/createSchedule')
  create(@Body() createCalendarDto: CreateCalendarDto) {
    const { title, start, end_time, description, userId } = createCalendarDto;
    return this.calendarService.createCalendar({ title, start, end_time, description, userId });
  }

  @Get('/allCalendar')
  async getAllCalendar() {
    const events = await this.calendarService.findAllCalendar();
    return events;
  }
}