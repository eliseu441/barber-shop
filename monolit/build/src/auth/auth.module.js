"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var auth_service_1 = require("./auth.service");
var users_module_1 = require("../users/users.module");
var passport_1 = require("@nestjs/passport");
var constants_1 = require("./constants");
var local_strategy_1 = require("./local.strategy");
var jwt_strategy_1 = require("./jwt.strategy");
var useSession_strategy_1 = require("./useSession.strategy");
var applySession_strategy_1 = require("./applySession.strategy");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                users_module_1.UsersModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.register({
                    secret: constants_1.jwtConstants.secret,
                    signOptions: { expiresIn: '180s' },
                }),
            ],
            providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, useSession_strategy_1.UseSessionStrategy, applySession_strategy_1.ApplySessionStrategy],
            exports: [auth_service_1.AuthService],
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map