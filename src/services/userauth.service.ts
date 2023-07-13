import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {

  constructor() { }



 

  public setRoles(roles:[])
  {
    localStorage.setItem("roles",JSON.stringify(roles));
  }


  public getRoles():[]
  {
    return JSON.parse(localStorage.getItem("roles") || '{}');
  }

  public setToken(jwtToken:string)
  {
    localStorage.setItem("jwtToken",jwtToken);
  }

  public getToken()
  {
    return localStorage.getItem("jwtToken");
  }


  public setUserId(userId:any)
  {
    localStorage.setItem("userId",userId)
  }

 

  public getUserId()
  {
    return localStorage.getItem("userId");
  }

  public setUserAddress(userAddress:any)
  {
    localStorage.setItem("userAddress",userAddress)
  }
  public getUserAddress()
  {
    localStorage.getItem("userAddress")
  }

  public setName(userName:any)
  {
    localStorage.setItem("userName",userName);
    // console.log("done")
  }
  public getName()
  {
    localStorage.getItem("userName");
  }

  public clear()
  {
    localStorage.clear();
  }

  public isLoggedIn()
  {
    return this.getRoles() && this.getToken();
  }


}

