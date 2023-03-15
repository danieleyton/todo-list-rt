import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-list-rt';

  constructor(private socket: Socket) {

  }

  async ngOnInit() {
    this.socket.connect();

    this.handleSocketConnections();

    /* Socket messages on connection and error handling */
    this.socket.on('connect', (error, callback) => {
			console.log('\x1b[36m%s\x1b[0m', "=========== Connected succesfully to socket ============");
      console.log("On room:", this.socket.ioSocket.query.room);
		});

    this.socket.on('reconnect', (error, callback) => {
      console.log('\x1b[36m%s\x1b[0m', "=========== Connection was lost. Reconnected succesfully ============");
      console.log(this);
			this.socket.connect();
		});

		this.socket.on('connect_error', (error, callback) => {
      console.log('\x1b[36m%s\x1b[0m', "=========== Error with socket ============");
      console.log(error);
		});
  }

  getCurrentClients(){
    this.socket.emit('getClients');
  }

  /* == Socket methods == */
  handleSocketConnections() {
    /* Subscribes to a socket event, in order to print them on console. You can edit this if necessary. */
    this.getClients().subscribe(data => {
			console.log('\x1b[36m%s\x1b[0m', "============= Current Clients ==========");
      console.log(data);
		});

    this.socket.fromEvent('createTask').subscribe((data) => console.log(data))
  }

  getClients() {
		return this.socket.fromEvent<any>('getClients');
	}
}
