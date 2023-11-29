import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthInterceptorService } from '../../services/auth-interceptor.service';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AuthService,
  ],
})
export class LoginComponent {
  usrname: string = '';
  pwd: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    try {
      let resp: any = await this.auth.loginWithUsernameAndPassword(
        this.usrname,
        this.pwd
      );
      localStorage.setItem('Token', resp['token']);
      console.log(resp);
      this.router.navigateByUrl('/todos');
    } catch (e) {
      console.error(e);
      alert('login failed');
    }
  }
}
