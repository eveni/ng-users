import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSign = false;
  inUserLogin: User = {
    username: '',
    password: ''
  }
  inUserSignUp: User = {
    email: '',
    username: '',
    password: ''
  }
  users: User[]
  msg;
  constructor(public tokenService: TokenService, public userService: UserService, public active: ActivatedRoute, public R: Router) { }
  ngOnInit() {

    if (this.tokenService.tokenExist()) {
      alert("You're already logged in!")
      this.R.navigate(['/'])
    }

    this.active.data.subscribe(d => {
      this.users = d.users
    })

  }

  isFill(d) {
    var ret = true
    for (let x in d) if (!d[x]) { ret = false; return ret }
    return ret
  }

  login() {
    this.isSign = false
    if (this.isFill(this.inUserLogin)) {
      let t = this.userService.logIn(this.inUserLogin, this.users)
      if (t) {
        this.msg = `Welcome on board ${this.inUserLogin.username}`
        this.tokenService.setToken(t)
        setTimeout(() => {
          this.R.navigate(['/'])
        }, 1000)
      } else this.msg = "wrong Email or password"
    } else this.msg = "please fill all the data"
  }

  signUp() {
    this.isSign = true
    if (this.isFill(this.inUserSignUp)) {
      this.userService.newUser(this.inUserSignUp).subscribe((user: User) => {
        if (user) {
          if (user.token) {
            this.tokenService.setToken(user.token)
            this.msg = `Welcome on board ${user.username}`
            setTimeout(() => {
              this.R.navigate(['/'])
            }, 1000)
          }
        } else this.msg = "User Already Exist!"
      })
    } else this.msg = 'please fill all the data'
  }
}
