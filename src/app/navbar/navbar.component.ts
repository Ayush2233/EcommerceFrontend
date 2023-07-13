import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserauthService } from 'src/services/userauth.service';
import { faSearch,faBagShopping,faUser,faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import {  } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  faSearch = faSearch;
  faCart=faBagShopping;
  faPerson=faUser;
  constructor(private userauth: UserauthService,private router:Router)
  {

  }

  public isLoggedin()
  {
    return this.userauth.isLoggedIn();
  }

  public logout()
  {
    this.userauth.clear();
    this.router.navigate(['/login'])
    
  }
}
