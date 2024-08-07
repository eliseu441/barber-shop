import {
    IsNotEmpty,
    MinLength,
  } from 'class-validator';
  
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
  
    export class CreateCalendarDto {
      title: string;
      start: Date;
      end_time: Date;
      description?: string;
      userId: number;
    }
  