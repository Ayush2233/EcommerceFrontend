import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/services/order.service';
import { faCancel, faCross } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent {


  cancelicon=faCancel
  constructor(private orderservice:OrderService,private route:ActivatedRoute)
  {

  }
  orderdetails:any
  orderid:any

  ngOnInit()
  {
    const routeParams = this.route.snapshot.paramMap;
    this.orderid = Number(routeParams.get('orderid'));
    this.orderservice.getorderdetails(this.orderid).subscribe((data)=>{this.orderdetails=data;})
    
  }

  isCancelled():boolean
  {
    if(this.orderdetails.orderStatus=="cancelled")
    {
      return true;
    }
    else
    {
      return false;
    }
  }


  cancelorder(orderid:any)
  {
    this.orderservice.cancelorder(orderid).subscribe(response=>{alert(response)});
  }
}
