import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Event } from './entities/calendar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, 
    Event
  ])],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}