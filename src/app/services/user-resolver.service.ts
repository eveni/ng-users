import { Injectable } from '@angular/core';
import { User } from './../models/user'
import { Resolve } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User[]> {
  constructor(public userService: UserService) { }
  resolve(): Observable<User[]> | Promise<User[]> | User[] {
    return this.userService.loadUsers()
  }
}
