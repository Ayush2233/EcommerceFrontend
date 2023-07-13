import { Component } from '@angular/core';
import { UserauthService } from 'src/services/userauth.service';
import { UserserviceService } from 'src/services/userservice.service';
import {faCircleUser,faBoxOpen,faArrowRightFromBracket,faHeadset,faKey, faPen, faTruck, faCircleCheck, faBan, faUserPlus, faSquare, faSquarePlus, faSquareMinus} from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/services/order.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent 
{

  user:any
  emails:any
  phones:any
  categories:any

  userorderentity:any
  role:any

  ordericon=faBoxOpen;
  usericon=faCircleUser;
  logouticon=faArrowRightFromBracket;
  helpicon=faUserPlus
  passwordicon=faKey
  editicon=faPen;
  addproducticon=faSquarePlus
  deleteproducticon=faSquareMinus

  states:any
  cities:any
  countries:any

  public product=
  {
    name: '',
    description: '',
    price: '',
    count: '',
    image:'',
    userEntity:{},
    category:{}
  }

  public seller = {
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
  ages= Array.from(Array(90).keys()).map(x => x+=10)
  

  transiticon=faTruck;
  successicon=faCircleCheck
  cancelicon=faBan

  passmatch:any

  selectedoption=1;

  heading="Profile"

  constructor(private proudctservice:ProductService,private userservice:UserserviceService,private userauthservice:UserauthService,private orderservice:OrderService,private router:Router)
  {
    
  }

  ngOnInit()
  {
    this.role=this.userauthservice.getRoles()
    this.proudctservice.getAllcategories().subscribe(data=>{this.categories=data})
    this.userservice.getUserById(this.userauthservice.getUserId()).subscribe((data)=>{this.user=data})
    this.userservice.getAllEmail().subscribe((data)=>{this.emails=data});
    this.userservice.getAllPhone().subscribe((data)=>{this.phones=data});
    this.userservice.getcountry().subscribe((data) => (this.countries = data));
    this.orderservice.getUserorders(this.userauthservice.getUserId()).subscribe((data)=>{this.userorderentity=data
      // console.log(this.userorderentity)
    })
  }

  isAdmin():boolean
  { 
    if(this.role[0].role=='Admin')
    {
      return true;
    }
    else
    {
      return false;
    }

  }
  isSeller():boolean
  { 
    if(this.role[0].role=='Seller')
    {
      return true;
    }
    else
    {
      return false;
    }

  }


  profile()
  {
    this.heading="Profile"
    this.selectedoption=1
  }

  orders()
  {
    this.heading="Orders"
    this.selectedoption=2
  }

  changepassword()
  {
    this.heading="Change Password"
    this.selectedoption=3
  }

  addseller()
  {
    this.heading="Add Seller"
    this.selectedoption=4
  }
  addadmin()
  {
    this.heading="Add Admin"
    this.selectedoption=5
  }
  addproduct()
  {
    this.heading="Add Product"
    this.selectedoption=6
  }
  deleteproduct()
  {
    this.heading="Delete Product"
    this.selectedoption=7
  }


  changepasswordfunction(oldpass:any,newpass:any,newpassconfirm:any)
  {
    if(newpass==newpassconfirm)
    {
      const userid = this.userauthservice.getUserId()
      const passdetails = {
        id: userid,
        oldpassword:oldpass,
        newpassword:newpass
      }

      this.userservice.changepassword(passdetails).subscribe
      (
        response=>{
          alert(response)
        }
       
      );
    }
    else
    {
      alert("Passwords dont Match")
    }

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


  onFormSubmit(country: any, state: any, city: any)
  {
    // console.log("Submitted")
    // console.log(this.emails)
    let ROLE =0
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

    if(this.selectedoption==4)
    {
      ROLE=2;
      this.userservice.addUser(this.user,state,city,ROLE).subscribe
      (
        (data)=>
        {
          alert('success');
        },
        (error)=>
        {
          alert("Something went wrong")
        }
      )
    }
    else if(this.selectedoption==5)
    {
      ROLE=1;
      this.userservice.addUser(this.user,state,city,ROLE).subscribe
      (
        (data)=>
        {
          alert('success');
        },
        (error)=>
        {
          alert("Something went wrong")
        }
      )
    }
  }

  addproductfunction(prodCategory:any)
  { 
    
    this.proudctservice.addproduct(this.product,this.userauthservice.getUserId(),prodCategory).subscribe(respnse=>{alert(respnse)},err=>{alert(err)})

  }

  public logout()
  {
    this.userauthservice.clear();
    this.router.navigate(['/login'])
    
  }


}
