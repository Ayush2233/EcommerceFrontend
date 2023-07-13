import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

  products:any
  categoryheading:any
  category:any


  constructor(private productservice:ProductService,private route: ActivatedRoute)
  {}

  ngOnInit():void
  {
    // this.productservice.getAllcategories().subscribe((data)=>{this.categories=data});
    // this.productservice.getAllProducts().subscribe((data)=>{this.products=data});
    const routeParams = this.route.snapshot.paramMap;
    this.category = String(routeParams.get('category'));
    this.categoryheading=this.category;
    this.productservice.getProductbyCategory(this.category).subscribe((data)=>{this.products=data})

    // this.productservice.getLimitedProducts(4).subscribe((data)=>{this.productslimited=data});
  }

}
