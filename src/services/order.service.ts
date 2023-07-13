import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpclient: HttpClient) { }

  placeorder(userid:any)
  {
    const url="http://localhost:8080/orders/addorder?buyerId="+userid;
    console.log(url)
    return this.httpclient.get(url,{responseType:'text'})
  }

  getorderdetails(orderid:any)
  {
    return this.httpclient.get(`http://localhost:8080/orders/showorder/${orderid}`)
  }

  getUserorders(userid:any)
  {
    return this.httpclient.get(`http://localhost:8080/orders/user/showorder/${userid}`)
  }

  getLatestOrder(userid:any)
  {
    return this.httpclient.get(`http://localhost:8080/orders/getlatest/${userid}`)
  }

  cancelorder(orderid:any)
  {
    return this.httpclient.get(`http://localhost:8080/orders/cancelorder/${orderid}`,{responseType:'text'})
  }
}
