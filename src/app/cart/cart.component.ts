import { Component } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserauthService } from 'src/services/userauth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {


  delete = faTrash;
  cartitems: any

  delivery=50;
  discount = 0;

  name:any


  cartprices: any[] = [];
  iscartempty:any
  carttotal: any
  grandtotal:any


  constructor(private productservice: ProductService, private userauthserivce: UserauthService) {

  }


  ngOnInit() {
    // this.cartitems=this.productservice.getCart(this.userauthserivce.getUserId);
    
    this.productservice.getCart(this.userauthserivce.getUserId()).subscribe((data) => {
      this.cartitems = data;

      if(this.cartitems)
      {
        this.totalPrice();
      }
      
    });
  }

  totalPrice() 
  {
    for (let i = 0; i < this.cartitems.length; i++) 
    {
      this.cartprices.push((this.cartitems[i].productEntity.price) * (this.cartitems[i].quantity))
    }
    this.carttotal = 0;
    this.cartprices.forEach(a => this.carttotal += a);

    this.grandtotal=this.carttotal+this.delivery-this.discount;
  }

  setdiscount(couponcode:any)
  {
    // console.log(this.iscartempty)
    if(couponcode==="ABC199" && !this.iscartempty)
    {
      this.discount=199;
      this.grandtotal=this.carttotal+this.delivery-this.discount;
    }
  }
  
  isCartempty()
  {
    if(this.cartitems.length==0)
    {
      
      return true;
    }
    else
    {
      // console.log(this.cartitems)
      return false
    }
  }
  
  deletefromcart(prdouctid:any)
  {
    console.log(prdouctid)
    return this.productservice.deletecartitem(this.userauthserivce.getUserId(),prdouctid)
    .subscribe
    (
      (data)=>
      {
        window.location.href = '/cart';
      },
      (error)=>
      {
        console.log(error);
        alert("Something went wrong");
      }
    );
  }

}

