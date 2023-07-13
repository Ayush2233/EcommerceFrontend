import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch,faBagShopping,faUser,faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { UserserviceService } from 'src/services/userservice.service';
import { UserauthService } from 'src/services/userauth.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product_id:any
  faCart=faBagShopping
  productidroute:any

  requestedProduct:any

  constructor(private productservice:ProductService,private route: ActivatedRoute,private userauth:UserauthService)
  {
    
    // this.productservice.getProductById().subscribe((data)=>{this.requestedProduct=data});
  }

  ngOnInit():void
  {
    const routeParams = this.route.snapshot.paramMap;
    
    this.productidroute = Number(routeParams.get('product_id'));
    this.productservice.getProductById(this.productidroute).subscribe((data)=>{this.requestedProduct=data; console.log(this.requestedProduct)})
    // this.prod
  }

  addtocart(productid:any)
  {
           
    // console.log(productid)
    if(this.userauth.isLoggedIn())
    {
      const userid = this.userauth.getUserId();

      return this.productservice.addproducttocart(userid,productid).subscribe
      (
        (data)=>
        {
          window.location.href = '/cart';
        },
        (error)=>
        {
          alert("Something went wrong")
        }
      )
    }
    else
    {
      window.location.href='/login'
      return;
      
    }
  }

}
