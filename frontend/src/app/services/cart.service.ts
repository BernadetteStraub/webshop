import { Injectable } from '@angular/core';
import {ProductResponse} from "../interfaces/product.model";
import {BehaviorSubject} from "rxjs";
export interface CartItem {
  product: ProductResponse;
  size: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartData: CartItem[] = [];
  private cartDataSubject = new BehaviorSubject<CartItem[]>(this.cartData);

  constructor() {
    this.cartData = [];
    this.loadCartFromLocalStorage();
  }

  getCartData() {
    return this.cartDataSubject.asObservable();
  }

  addToCart(product: ProductResponse, quantity: number, size: number): void {
    const existingItemIndex = this.cartData.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingItemIndex !== -1) {
      this.cartData[existingItemIndex].quantity += quantity;
    } else {
      this.cartData.push({ product, quantity, size });
    }
    this.cartDataSubject.next(this.cartData);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  removeFromCart(item: CartItem): void {
    this.cartData = this.cartData.filter(
      (cartItem) =>
        cartItem.product.id !== item.product.id || cartItem.size !== item.size
    );
    this.cartDataSubject.next(this.cartData);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  emptyCart(): void {
    this.cartData = [];
    this.cartDataSubject.next(this.cartData);
    localStorage.removeItem('cart');
  }

  private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedData = JSON.parse(storedCart);
      this.cartData = Array.isArray(parsedData) ? parsedData : [];
      this.cartDataSubject.next(this.cartData);
    }
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }
}
