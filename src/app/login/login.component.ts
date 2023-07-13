import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { UserauthService } from 'src/services/userauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public credentials =
  {
    username:'',
    password:''
  }

  constructor(private loginservice:LoginService,private userauthservice:UserauthService,private router:Router)
  {

  }

  ngOnInit()
  {

  }

  onLoginSubmit(username:any,password:any)
  {
    this.credentials.username=username;
    this.credentials.password=password;

    this.loginservice.generateToken(this.credentials).subscribe(
      (response:any)=>
    {
      this.userauthservice.setRoles(response.role)
      this.userauthservice.setToken(response.token)
      this.userauthservice.setUserId(response.userId)
      this.userauthservice.setUserAddress(response.userAddress)
      this.userauthservice.setName(response.userName)

      console.log(response)
      // console.log(this.userauthservice.getName())
      
      // this.userauthservice.setUserAddress(response.userAddress)
      // console.log(this.userauthservice.getUserAddress())
      // console.log(this.userauthservice.getName())
      

      const role =response.role[0];
      if(role.role==="Admin")
      {
        this.router.navigate(['user']);
      }
      if(role.role==="Buyer")
      {
        this.router.navigate(['home']);
      }
      else
      {
        this.router.navigate(['home'])
      }
    },
    (error)=>
    {
      console.log(error);
    }
    )
  }

}
