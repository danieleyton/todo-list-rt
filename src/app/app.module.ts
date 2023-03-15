import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const config: SocketIoConfig = {
  url: 'https://stage.allrideapp.com/tech_interview',
  options: {
    transports: ['websocket'],
    query: {
      room: 'danieleyton'
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
