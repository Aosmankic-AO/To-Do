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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TodoService = class TodoService {
    constructor(todoModel) {
        this.todoModel = todoModel;
    }
    async create(todo) {
        const { title } = todo;
        const existingToDo = await this.todoModel.findOne({ title });
        if (existingToDo) {
            console.log(existingToDo.title + ': Already exists');
            throw new common_1.HttpException('Item already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdToDo = new this.todoModel(todo);
        return createdToDo.save();
    }
    async findAll() {
        return this.todoModel.find().exec();
    }
    async findOne(id) {
        return this.todoModel.findOne({ _id: id }).exec();
    }
    async update(id, todo) {
        return this.todoModel.findByIdAndUpdate(id, todo, { new: true });
    }
    async delete(id) {
        return this.todoModel.findByIdAndRemove(id);
    }
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Todo')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map