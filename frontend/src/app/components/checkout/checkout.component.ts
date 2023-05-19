import {Component, OnInit} from '@angular/core';
import {CartItem, CartService} from "../../services/cart.service";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {UserResponse} from "../../interfaces/user.model";
import {AuthService} from "../../services/auth.service";
import {OrderRequest} from "../../interfaces/order.model";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  user: UserResponse | null = null; // Replace with your user address type
  cart: CartItem[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    combineLatest([this.cartService.getCartData(), this.authService.currentUser$]).subscribe(
      ([cart, user]) => {
        this.cart = cart;
        this.user = user;
      });
  }

  confirmOrder() {
    if(this.user && this.cart){
      const orderRequest: OrderRequest = {
        userId: this.user.id,
        items: this.cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          size: item.size,
        })),
      };
      this.apiService.createOrder(orderRequest).subscribe(
        () => {
          this.cartService.emptyCart();
          this.router.navigate(['/orders']);
        }
      );
    }
  }
}
