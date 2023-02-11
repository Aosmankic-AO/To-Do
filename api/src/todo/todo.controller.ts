import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';
import { isValidObjectId } from 'mongoose';

@Controller('/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // Post new ToDo item
  @Post()
  async create(@Body() createTodoDto: Todo): Promise<Todo> {
    console.log('New item created: ' + createTodoDto.title);
    return this.todoService.create(createTodoDto);
  }

  // Get all
  @Get()
  async findAll(): Promise<Todo[]> {
    console.log('Grabbed all To-Do Items');
    return this.todoService.findAll();
  }

  // findOne Method - Get by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    try {
      const todo = await this.todoService.findOne(id);
      console.log('Grabbed item: ' + todo.title);
      console.log('ID:' + todo.id);
      return todo;
    } catch (error) {
      if (error.name === 'CastError') {
        console.log('The Todo Item you are looking for is not found');
        throw new HttpException('Todo Item not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // update Method - Update by id
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto) {
    console.log('updated');
    return this.todoService.update(id, updateTodoDto);
  }

  // Delete by id
  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid Todo ID', HttpStatus.BAD_REQUEST);
    }
    const objectID = new ObjectId(id);
    console.log(objectID + ' Has been deleted.');
    return this.todoService.delete(id);
  }
}
