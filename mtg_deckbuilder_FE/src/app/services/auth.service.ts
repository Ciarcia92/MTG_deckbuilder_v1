import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AuthUser, LoginUser, RegisterUser } from '../interfaces/login-register.interface';
import { TokenInterface } from '../interfaces/token.interface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  authSubj = new BehaviorSubject<null | TokenInterface>(null);
  user$ = this.authSubj.asObservable();
  apiUrl = environment.api;

  constructor(private http: HttpClient, private router: Router) {
    const user = this.getUser();
    if (user && user.token) {
    this.authSubj.next(user.token);
    }
  }

  signUp(data: RegisterUser): Observable<TokenInterface> {
      return this.http
          .post<TokenInterface>(`${this.apiUrl}/auth/signup`, data)
          .pipe(
              tap((res) => {
                  this.authSubj.next(res);
                  localStorage.setItem('user', JSON.stringify(res));
                  this.router.navigate(['/'])
                  window.location.href = 'http://localhost:4200';
              })
          );
  }

  login(data: LoginUser): Observable<TokenInterface> {
      return this.http
          .post<TokenInterface>(`${this.apiUrl}/auth/login`, data)
          .pipe(
              catchError((err) => {
                  throw err;
              }),
              tap((res) => {
                  this.authSubj.next(res);
                  localStorage.setItem('user', JSON.stringify(res));
                  this.router.navigate(['/'])
                  window.location.href = 'http://localhost:4200';
              })
          );
  }

  logout() {
      this.authSubj.next(null);
      localStorage.clear();
      this.router.navigate(['/login'])
  }

  getUser(){
    let user = localStorage.getItem('user');
    if(user){
      return  JSON.parse(user);
    } else null;
  }

  isLogged(): boolean {
    return localStorage.getItem('user') != null ? true : false;
  }


  loggedUser() {
    let user = localStorage.getItem('user');
    return localStorage.getItem('user') != null ? user : '';
  }

  clearAll() {
    localStorage.removeItem('user');
  }

  public checkTokenValidity(): boolean {
    const user = this.getUser();;

    if (!user || !user.token) {
      return false;
    }
    const isExpired = this.jwtHelper.isTokenExpired(user.token);
    if (isExpired) {
      this.clearAll();
      return false;
    }
    return true;
  }

}
