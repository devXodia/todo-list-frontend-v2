import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { AuthInterceptorService } from '../../services/auth-interceptor.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss',
})
export class AllTodosComponent {
  constructor(
    private http: HttpClient,
    private interceptor: AuthInterceptorService
  ) {}

  todos: any = [];
  error = false;

  async ngOnInit() {
    try {
      this.todos = await this.loadTodos();
      console.log(this.todos);
      this.error = false;
    } catch (e) {
      this.error = true;
    }
  }

  loadTodos() {
    const url = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get(url));
  }
}
