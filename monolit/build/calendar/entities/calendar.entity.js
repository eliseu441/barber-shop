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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.User = void 0;
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int', default: 0 }),
        __metadata("design:type", Number)
    ], User.prototype, "permission", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Event; }, function (event) { return event.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "events", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)('user')
    ], User);
    return User;
}());
exports.User = User;
var Event = /** @class */ (function () {
    function Event() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Event.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 255 }),
        __metadata("design:type", String)
    ], Event.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Event.prototype, "start", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Event.prototype, "end_time", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 500, nullable: true }),
        __metadata("design:type", String)
    ], Event.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int', nullable: true }),
        __metadata("design:type", Number)
    ], Event.prototype, "viewerId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User; }, function (user) { return user.events; }),
        __metadata("design:type", User)
    ], Event.prototype, "user", void 0);
    Event = __decorate([
        (0, typeorm_1.Entity)()
    ], Event);
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=calendar.entity.js.map