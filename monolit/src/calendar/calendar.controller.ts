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
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api')
export class CalendarController {
  constructor(
    private readonly calendarService: CalendarService,
  ) {}

  @Post('/createSchedule')
  async create(@Body() createCalendarDto: CreateCalendarDto) {
    const { title, start, end_time, description, user_id, viewer_id } = createCalendarDto;

    // Encontra o usuário pelo ID

    // Cria o evento associado ao usuário
    const event = await this.calendarService.createCalendar({
      user_id,
      title,
      start,
      end_time,
      description,
      viewer_id,
    });

    return event;
  }

  @Get('/allCalendar')
  async getAllCalendar() {
    const events = await this.calendarService.findAllCalendar();
    return events;
  }
  @Post('/createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.calendarService.createUser(createUserDto);
    return user;
  }
}