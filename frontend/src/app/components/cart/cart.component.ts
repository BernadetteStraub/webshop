import {Component, OnInit} from '@angular/core';
import {CartItem, CartService} from "../../services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$ = this.cartService.getCartData();

  constructor(private cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  emptyCart(): void {
    this.cartService.emptyCart();
  }
}
