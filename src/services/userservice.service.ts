import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { text } from '@fortawesome/fontawesome-svg-core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  public getcountry() {
    return this.http.get('http://localhost:8080/address/country');
  }


  public getstate(country_sel: any) {
    return this.http.get('http://localhost:8080/address/state', {
      params: {
        country: country_sel,
      },
    });
  }

  public getcity(state_sel: any) {
    return this.http.get('http://localhost:8080/address/city', {
      params: {
        state: state_sel,
      },
    });
  }

  public getAllEmail()
  {
    return this.http.get("http://localhost:8080/users/getall/email")
  }

  public getAllPhone()
  {
    return this.http.get("http://localhost:8080/users/getall/phone")
  }

  duplicateEmail(users: any, userEmail: any) {
    for (var v in users) {
      if (users[v]==userEmail) {
        return true;
      }
    }
    return false;
  }

  duplicatePhone(users: any, userPhone: any) {

    for (var v in users) {
      if (users[v]==userPhone) {
        return true;
      }
    }
    return false;
  }

  public addUser(user: any,statename: any, cityname: any,role:any) {
    return this.http.post('http://localhost:8080/users/adduser', user, {
      params: {
        city:cityname,
        state:statename,
        role:role
      },
    });
  }

  getUserById(userId:any)
  {
    return this.http.get(`http://localhost:8080/users/getuser/${userId}`)
  }

  changepassword(passworddetails:any)
  {
    return this.http.post('http://localhost:8080/users/changepassword',passworddetails,{responseType:'text'});
  }



}
