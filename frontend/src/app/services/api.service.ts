import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, tap} from 'rxjs';
import {ProductRequest, ProductResponse} from "../interfaces/product.model";
import {OrderRequest, OrderResponse} from "../interfaces/order.model";
import {AuthRequest, AuthResponse, UserRequest, UserResponse, UserUpdate} from "../interfaces/user.model";
import {AuthService} from "./auth.service";
import jwtDecode from "jwt-decode";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;
  private searchSubject: BehaviorSubject<string> = new BehaviorSubject("");
  private genderSubject: BehaviorSubject<string> = new BehaviorSubject("all");
  private searchObservable$ = this.searchSubject.asObservable();
  private genderObservable$ = this.genderSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.initializeCurrentUser();
  }

  private initializeCurrentUser(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        this.getUserById(userId).subscribe(
          {
            next: (user: UserResponse) => {
              this.authService.setCurrentUser(user);
            },
            error: (err) => {
              console.error('Error loading user: ', err);
              this.authService.removeToken();
              this.authService.removeCurrentUser();
            }
          }
        );
      } catch (error) {
        console.error('Error decoding token: ', error);
        this.authService.removeToken();
      }
    }
  }


  pushSearchString(value: string){
    this.searchSubject.next(value);
  }

  pushGender(value: string){
    this.genderSubject.next(value);
  }

  getAllProductsFiltered(): Observable<ProductResponse[]> {
    return combineLatest([this.searchObservable$, this.getAllProducts(), this.genderObservable$])
      .pipe(
        map(([searchString, products, gender]) => {
          const productsFilteredByName = products.filter(product => product.title.includes(searchString));
          return productsFilteredByName.filter(product => product.gender === gender || gender === 'all');
        })
      );
  }

  getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.apiUrl}/product`);
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/product/${id}`);
  }

  createProduct(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.apiUrl}/product`, product);
  }

  getAllOrdersForUser(id: number): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${this.apiUrl}/order/user/${id}`);
  }

  getOrderById(id: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/order/${id}`);
  }

  createOrder(order: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/order`, order);
  }

  registerUser(user: UserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/user/register`, user)
      .pipe(
        tap((response) => {
          this.authService.setToken(response.token);
        }),
      );
  }

  updateUser(user: UserUpdate, id: number): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/user/${id}`, user);
  }

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/user/${id}`);
  }

  loginUser(user: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/user/login`, user)
      .pipe(
        tap((response) => {
          this.authService.setToken(response.token);
          this.authService.setCurrentUser(response.user);
        })
      );
  }
}
