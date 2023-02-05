import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Todo } from "./todo.interface";


//CRUD Create, Read, Update, Delete opertation for Todo

@Injectable()
export class TodoService {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

    // Create new To-Do Item
    async create(todo: Todo): Promise<Todo> {
        const {title} = todo;
        const existingToDo = await this.todoModel.findOne({title});

        if(existingToDo) {
            console.log(existingToDo.title + ': Already exists');
            throw new HttpException('Item already exists', HttpStatus.BAD_REQUEST);
        }

        const createdToDo = new this.todoModel(todo);
        return createdToDo.save();
    }
        
    // Get all To-Do Items
    async findAll(): Promise<Todo[]> {
        return this.todoModel.find().exec();
      }

    // Get single To-Do Item
    async findOne(id: string): Promise<Todo> {
        return this.todoModel.findOne({_id: id}).exec();
    }

    // Update a single To-Do Item
    async update(id: string, todo: Todo): Promise<Todo> {
        return this.todoModel.findByIdAndUpdate(id, todo, {new: true});
    }

    // Delete a single To-Do Item
    async delete(id: string) {
        return this.todoModel.findByIdAndRemove(id);
    }
}