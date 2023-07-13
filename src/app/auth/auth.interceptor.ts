import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { LoginService } from "src/services/login.service";
import { UserauthService } from "src/services/userauth.service";

@Injectable({providedIn:'root'})
export class AuthInterceptor implements HttpInterceptor
{

    constructor(
        private userauthservice:UserauthService,
        private router:Router
        
        ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>    
    {
        if(req.headers.get("No-Auth")==="True")
        {
            return next.handle(req.clone());
        }

        const token=this.userauthservice.getToken();

        this.addTokenHeader(req,token);

        return next.handle(req).pipe(
            
            catchError(
                (err:HttpErrorResponse)=>
                {
                    // console.log(err.status);
                    if(err.status===401)
                    {
                        this.router.navigate(['/login']);
                    }
                    else if(err.status===403)
                    {
                        this.router.navigate(['/forbidden']);
                    }
                    
                    return throwError("Something Went Wrong");  
                }
            )
        );

       
    }

    private addTokenHeader(request:HttpRequest<any>,token:String | null)
    {
        return request.clone(
            {
                setHeaders:{
                    Authorization: `Bearer ${token}`
                }
            })
    }
    
}