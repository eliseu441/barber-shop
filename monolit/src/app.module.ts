import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendarModule } from './calendar/calendar.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'portal'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db-projects.cjukum6eu94v.us-east-2.rds.amazonaws.com',
      port: 5432,
      username: 'eliseu4411',
      password: 'Gersileia5500',
      database: 'calendar',
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
    CalendarModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
