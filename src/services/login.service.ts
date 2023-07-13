import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserauthService } from './userauth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://localhost:8080/users/authenticate";

  requestHeader = new HttpHeaders(
    {
      "No-Auth":"True"
    }
  )

  constructor(private http: HttpClient,private userauth: UserauthService) { }




  generateToken(credentials: any) 
  {
    //toekn generate
    return this.http.post(this.url, credentials,{headers:this.requestHeader});
  }

  public forBuyer()
  {
    
  }

  public matchRole(allowedRoles:any):boolean
  {
    let isMatch= false;
    const userroles:any=this.userauth.getRoles();

    if(userroles!=null && userroles)
    {
      for(let i=0;i<userroles.length;i++)
      {
        for(let j=0;j<allowedRoles.length;j++)
        {
          if(userroles[i].role===allowedRoles[j])
          {
            isMatch=true;
            return isMatch;
          }
          else{
            return isMatch
          }
        }
      }
    }
    return isMatch;

  }


}
