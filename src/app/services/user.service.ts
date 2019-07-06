import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = 'http://localhost:3131'
  private userNew = `${this.users}/new`

  constructor(public http: HttpClient) {}
  
  loadUsers() {
    return this.http.get<User[]>(this.users)
  }

  newUser(nu: User) {
    return this.http.post<any>(this.userNew, JSON.stringify(nu), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }

  logIn(loginUser: User, users: User[]) {
    for (let x of users) {
      if (x.username == loginUser.username) {
        if (x.password == loginUser.password) {
          return x.token
        }
      }
    }
  }

  lookFor(token, users: User[]) {
    let ret
    for (let x of users) {
      if (x.token == token) {
        ret = x
        return ret
      }
    }
    return ret
  }
}
