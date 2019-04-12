
import { tap, filter } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MEAT_API } from "../../app.api";
import { User } from "./user.model";
import { Router, NavigationEnd } from "@angular/router";




@Injectable()
export class LoginService {

    user: User;

    lastUrl: string;

    constructor(private http: HttpClient, private router: Router){
        this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => this.lastUrl = e.url);
    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    login(email: string, password: string) : Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password}).pipe(tap(user => this.user = user));
    }

    logout() : void {
        this.user = undefined;
    }

    handleLogin(path: string = this.lastUrl): void {//atribuicao no parametro: se o parametro nao for passado, recebe como default this.lastUrl
        this.router.navigate(['/login', btoa(path)]);//btoa faz encode para base 64 da
    }

}