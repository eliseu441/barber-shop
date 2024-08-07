"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const calendar_entity_1 = require("./entities/calendar.entity");
let CalendarService = class CalendarService {
    constructor(eventRepository, userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }
    async createCalendar(createCalendarDto) {
        const user = await this.userRepository.findOneBy({ id: createCalendarDto.user_id });
        if (!user) {
            throw new Error(`User with id ${createCalendarDto.user_id} not found`);
        }
        const userName = user.name;
        const titleWithUserName = `${userName} - ${createCalendarDto.title}`;
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
        const result = await this.eventRepository.query(query, values);
        return result[0];
    }
    async findAllCalendar() {
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
    viewCalendar(id) {
        return this.eventRepository.findOneBy({ id });
    }
};
exports.CalendarService = CalendarService;
exports.CalendarService = CalendarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(calendar_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(calendar_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CalendarService);
//# sourceMappingURL=calendar.service.js.map