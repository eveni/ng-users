import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenName = "ng-token"
  constructor() {}
  isValid(t) {
    if (t.length >= 6) return true
    else return false
  }

  tokenExist() {
    let token = localStorage.getItem(this.tokenName)
    if (token && this.isValid(token)) return true
    else return false
  }

  getToken(){
    return localStorage.getItem(this.tokenName)
  }

  setToken(t:string){
    localStorage.setItem(this.tokenName, t)
  }
}
