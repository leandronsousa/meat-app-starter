import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()//capaz de injetar outros servicos
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {}//injeta de forma manual, angular 4.3? nao permite injetar direto.
    //Causa erro: Provider parse errors: Cannot instantiate cyclic dependency! InjectionToken_HTTP_INTERCEPTORS

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService);//injetando de forma manual
        if (loginService.isLoggedIn()) {
            //request eh imutavel
            const authRequest = request.clone(
                {setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}}
            );
            return next.handle(authRequest);
        } else {
            return next.handle(request);
        }
    }

}