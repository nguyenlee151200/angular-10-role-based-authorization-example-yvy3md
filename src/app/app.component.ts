import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  user: User;
  users: User[];

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.authenticationService.user.subscribe((x) => {
      this.user = x;
      if (this.isAdmin) {
        this.getUsers();
      }
    });
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
  }

  getUsers() {
    this.authenticationService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
