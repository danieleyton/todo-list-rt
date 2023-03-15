import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private socket: Socket) { 
    
  }

  createTask(description: String) {
    this.socket.emit('createTask', description);
  }

  onCreateTask() {
    return this.socket.fromEvent('createTask');
  }

  updateTask(description: String) {
    this.socket.emit('updateTask', description);
  }

  deleteTask(id: String) {
    this.socket.emit('deleteTask', id);
  }

  onDeleteTask() {
    return this.socket.fromEvent('deleteTask');
  }

  completeTask(id: String) {
    this.socket.emit('completeTask', id);
  }

  onCompleteTask() {
    return this.socket.fromEvent('completeTask');
  }
}
