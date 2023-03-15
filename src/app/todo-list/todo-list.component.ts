import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: TodoService) { 
    this.todos = [
      {id: '0', description: 'un todo', isCompleted: false},
      {id: '1', description: 'otro todo', isCompleted: false},
      {id: '2', description: 'y otro mas', isCompleted: false}
    ]
  }

  ngOnInit() {
    this.todoService.onCreateTask().subscribe((data) => {
      console.log(data);
      this.addTodo((data as string));
    });

    this.todoService.onDeleteTask().subscribe((data) => {
      console.log(data as string);
      this.deleteTodo((data as string));
    });

    this.todoService.onCompleteTask().subscribe(data => {
      console.log(data);
      this.toggleCompleteTodo((data as string));
    })
  }

  addTodo(description: string) {
    this.todos.push({id: (uuidv4() as string), description: description, isCompleted: false});
  }

  deleteTodo(id: string) {
    console.log(id);
    const index = this.todos.findIndex((obj) => {
      return obj.id === id;
    });

    if (index !== -1) {
      this.todos.splice(index, 1);
      this.todoService.deleteTask(id);
      console.log(index);
    }
  }

  toggleCompleteTodo(id: string) {
    const index = this.todos.findIndex(obj => {
      return obj.id === id;
    });

    this.todos[index].isCompleted = false;//!this.todos[index].isCompleted;
    this.todoService.completeTask(id);

  }

  onClick(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.addTodo(titleInput.value);
      this.todoService.createTask(titleInput.value);
      titleInput.value = "";
    }
  }

}
