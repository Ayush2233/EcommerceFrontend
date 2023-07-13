import { Component } from '@angular/core';
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard, faGooglePay, faAmazonPay } from '@fortawesome/free-brands-svg-icons';
import { ProductService } from 'src/services/product.service';
import { UserauthService } from 'src/services/userauth.service';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/services/userservice.service';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  delivery = 50;
  discount = 0;
  userdetails:any

  cartitems: any
  cartprices: any[] = [];
  iscartempty: any
  carttotal: any
  grandtotal: any
  cash = faMoneyBillAlt;
  visa = faCcVisa;
  mastercard = faCcMastercard;
  gpay = faGooglePay;
  apay = faAmazonPay;

  orderid:any

  

  constructor(private productservice: ProductService,private orderservice:OrderService,private userservice:UserserviceService, private userauthserivce: UserauthService,private route: ActivatedRoute) {

  }

  ngOnInit() 
  {
    const routeParams = this.route.snapshot.paramMap;
    this.discount = Number(routeParams.get('discount'));

    this.userservice.getUserById(this.userauthserivce.getUserId()).subscribe((data)=>{this.userdetails=data;console.log(this.userdetails)})
    this.productservice.getCart(this.userauthserivce.getUserId()).subscribe((data) => {
      this.cartitems = data;
      if (this.cartitems) {
        this.iscartempty = false;
        this.totalPrice();
        console.log(this.cartitems)
      }
      else {
        this.iscartempty = true;
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

  isCartempty()
  {
    if(this.cartitems.length==0)
    {
      
      return true;
    }
    else
    {
      console.log(this.cartitems)
      return false
    }
  }

  placeorder()
  {
      this.orderservice.placeorder(this.userauthserivce.getUserId()).subscribe
      (
        (data)=>
        {
          alert(data)
          console.log("data");
          window.location.href='/user'

        }
      );
      
  }


}
