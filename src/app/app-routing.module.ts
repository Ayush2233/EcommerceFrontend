import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductComponent } from './product/product.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';

const routes: Routes = 
[
  // {},

  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'login', component: LoginComponent, pathMatch: 'full' },

  { path: 'signup', component: SignupComponent, pathMatch: 'full' },

  { path: 'home', component: HomeComponent, pathMatch: 'full',},

  { path: 'forbidden', component: ForbiddenComponent, pathMatch: 'full', },

  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full',canActivate:[AuthGuard],data:{roles:["Admin"]} },

  { path:'product/:product_id',component:ProductComponent,pathMatch:'full'},

  { path:'shop/:category',component:ShopComponent,pathMatch:'full'},

  { path:'cart',component:CartComponent,pathMatch:'full'},

  { path:'checkout/:discount',component:CheckoutComponent,pathMatch:'full'},

  { path:'delivery/:orderid',component:DeliveryComponent,pathMatch:'full'},
  { path:'user',component:UserdashboardComponent,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
