import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { faTShirt,faMobileScreen,faShoePrints,faLaptop,faStopwatch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  categories:any
  products:any

  productslimited:any


  
  router!: Router

  tshirt=faTShirt;
  mobile=faMobileScreen;
  shoes=faShoePrints;
  watch=faStopwatch;
  electronic=faLaptop;

  
  icons=[this.tshirt,this.shoes,this.watch,this.electronic,this.mobile,]



  constructor(private productservice:ProductService)
  {}

  ngOnInit()
  {
    this.productservice.getAllcategories().subscribe((data)=>{this.categories=data});
    // this.productservice.getAllProducts().subscribe((data)=>{this.products=data});

    this.productservice.getLimitedProducts(4).subscribe((data)=>{this.productslimited=data});
  }

  

}
