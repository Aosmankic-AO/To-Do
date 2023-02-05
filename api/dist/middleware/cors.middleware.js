"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
const common_1 = require("@nestjs/common");
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
let CorsMiddleware = class CorsMiddleware {
    use(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        next();
    }
};
CorsMiddleware = __decorate([
    (0, common_1.Injectable)()
], CorsMiddleware);
exports.CorsMiddleware = CorsMiddleware;
//# sourceMappingURL=cors.middleware.js.map