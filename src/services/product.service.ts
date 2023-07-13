import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpclient:HttpClient) {

   }

  getAllcategories()
  {
    return this.httpclient.get("http://localhost:8080/category/all")
  }

  getAllProducts()
  {
    return this.httpclient.get("http://localhost:8080/products/all")
  }

  getProductById(productId:any)
  {
    return this.httpclient.get(`http://localhost:8080/products/getbyid/${productId}`);
  }

  getProductbyCategory(category:String)
  {
    if(category==="All")
    {
      return this.httpclient.get("http://localhost:8080/products/all")
    }
    else
    {
      return this.httpclient.get(`http://localhost:8080/products/category/${category}`)
    }
    
  }

  getLimitedProducts(limit:any)
  {
    return this.httpclient.get(`http://localhost:8080/products/limit/${limit}`)
  }

  addproducttocart(userid:any,productid:any)
  {
    const url="http://localhost:8080/users/cart/addtocart/"+userid+"?productId="+productid;
    console.log(url)
    return this.httpclient.get<any>(url)
  }

  getCart(userid:any)
  {
     return this.httpclient.get(`http://localhost:8080/users/cart/${userid}`);
  }

  deletecartitem(userid:any,productid:any)
  {
    const url="http://localhost:8080/users/cart/deletecart/"+userid+"?productId="+productid;
    return this.httpclient.get<any>(url);
  }

  addproduct(product:any,userid:any,category:any)
  {
    const url="http://localhost:8080/products/addproduct?sellerId="+userid+"&category="+category;
    return this.httpclient.post(url,product,{responseType:'text'})
  }
}
