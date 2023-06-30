import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem, CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {map, Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems$ = this.cartService.getCartData();
  subs: Subscription[] = [];

  constructor(private cartService: CartService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  proceedToCheckout(): void {
    this.subs.push(
    this.authService.currentUser$.pipe(
      map(user => {
        if (user) {
          this.router.navigate(['/checkout']);
        } else {
          this.router.navigate(['/login']);
        }
      })
    ).subscribe());
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  emptyCart(): void {
    this.cartService.emptyCart();
  }
}
