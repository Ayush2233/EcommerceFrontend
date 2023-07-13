import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent {

  countries:any
  states:any
  cities:any
  emails:any
  phones:any
  role=3;
  ages= Array.from(Array(90).keys()).map(x => x+=10)
  
  


  public user = {
    name: '',
    password: '',
    email: '',
    phone: '',
    age: '',
    rolecheck:'',
    confirmPassword:'',
    isActive:false,
    address: {
      address: '',
    },
  };

  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';




  constructor(private userservice:UserserviceService)
  {
    // console.log(this.userservice);
    // console.log(this.ages);
  }

  ngOnInit()
  {
    this.userservice.getcountry().subscribe((data) => (this.countries = data));
    this.userservice.getAllEmail().subscribe((data)=>{this.emails=data});
    this.userservice.getAllPhone().subscribe((data)=>{this.phones=data});

    // console.log(this.countries);
  }


  onChangeCountry(country:String)
  {
    if(country)
    {
      this.userservice.getstate(country).subscribe((data)=>{
        this.states=data
        this.cities=null}
        )
    }
    else
    {
      this.states=null;
      this.cities=null;
    }
  }

  onChangeState(state:String)
  {
    if(state)
    {
      this.userservice.getcity(state).subscribe(
        (data)=>{
          this.cities=data
        }
      )
    }
    else
    {
      this.cities=null;
    }

  }

  // formSubmit(country: any, state: any, city: any) {

  //   this.userService.addUser(this.user, country, state, city).subscribe(
  //     (data) => {
  //       alert('success');
  //       window.location.href = '/login';
  //     },
  //     (error) => {
  //       alert('something went wrong!');
  //     }
  //   );
  // }

  onFormSubmit(country: any, state: any, city: any)
  {
    // console.log("Submitted")
    // console.log(this.emails)
    // console.log(this.phones)


    if (this.userservice.duplicateEmail(this.emails, this.user.email)) {

      alert('email is already registered! ');
      return;
    }
    if (this.userservice.duplicatePhone(this.phones, this.user.phone)) {
      alert('Number is already registered! ');
      return;
    }

    if (this.user.email == null || this.user.name == null) {
      alert('email and userName is required !!');
      return;
    }

       


    this.userservice.addUser(this.user,state,city,this.role).subscribe
    (
      (data)=>
      {
        alert('success');
        window.location.href = '/login';
      },
      (error)=>
      {
        alert("Something went wrong")
      }
    )

  }
  
}
