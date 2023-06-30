import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";
import {BehaviorSubject} from "rxjs";
import {UserResponse} from "../interfaces/user.model";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private readonly tokenKey = 'authToken';

  public logout(): void {
    this.removeCurrentUser();
    this.removeToken();
  }

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public setCurrentUser(user: UserResponse): void {
    this.currentUserSubject.next(user);
  }

  public removeCurrentUser(): void {
    this.currentUserSubject.next(null);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      this.removeCurrentUser();
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        this.removeToken();
        this.removeCurrentUser();
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
