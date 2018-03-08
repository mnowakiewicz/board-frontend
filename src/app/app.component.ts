import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Message {
  content: string;
  author: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  time = '';
  messages = Array<Message>();
  newMessage: Message = {author: '', content: ''};
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:4200/api/time', {responseType: 'text'}).subscribe(data => {
      this.time = data as string;
    });
    this.http.get('http://localhost:4200/api/messages').subscribe(data => {
      this.messages = data as Array<Message>;
    });
  }

  send() {
    this.http.post('http://localhost:4200/api/messages', this.newMessage).subscribe(data => {
      console.log(this.newMessage.author);
      console.log(this.newMessage.content);
      this.messages = data as Array<Message>;
      this.newMessage.content = '';
    });
  }
}
