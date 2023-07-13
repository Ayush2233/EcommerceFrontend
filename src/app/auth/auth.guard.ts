import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserauthService } from 'src/services/userauth.service';
import { LoginService } from 'src/services/login.service';


@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate
{

  constructor(
    private userauthservice:UserauthService,
    private router:Router,
    private loginservice:LoginService

    ){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      if(this.userauthservice.getToken()!==null)
      {
        const role=route.data["roles"] as Array<String>;

        if(role)
        {
          const match=this.loginservice.matchRole(role);

          if(match)
          {
            return true;
          }
          else
          {
            this.router.navigate(['/forbidden'])
            return false;
          }

        }
      }

      this.router.navigate(['/login'])
      return false;
  }



}


// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
