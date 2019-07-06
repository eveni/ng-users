import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: User[]
  thisUser: User
  constructor(public userService:UserService, public tokenService:TokenService) {}
  ngOnInit() {
    this.userService.loadUsers().subscribe(u => {
      this.users = u
      let t = this.tokenService.getToken()
      this.thisUser = this.userService.lookFor(t,this.users)
    })
  }

  logout(){
    localStorage.clear()
    window.location.reload()
  }
}
