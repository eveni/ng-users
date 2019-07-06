import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  hasToken = false
  constructor(public tokenService:TokenService){}
  ngOnInit(){
    this.hasToken = this.tokenService.tokenExist()
  }

}
