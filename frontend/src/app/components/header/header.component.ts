import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CartItem, CartService} from "../../services/cart.service";
import {debounceTime, filter, map, Observable, Subscription, tap} from "rxjs";
import {UntypedFormBuilder, UntypedFormControl} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn$: Observable<boolean>;
  cartData$: Observable<CartItem[]>;
  displayGender: "female" | "male" | "all" = "all";
  searchString: string | null = null;
  showSearchDelete: boolean = false;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartData$ = this.cartService.getCartData();
    this.isLoggedIn$ = this.authService.currentUser$.pipe(
      map(user => user != null)
    );
  }

  ngOnInit(): void {
  }

  handleSearchStringChange(event: any) {
    this.apiService.pushSearchString(event);
  }

  handleGenderChange(event: any) {
    this.apiService.pushGender(this.displayGender);
  }

  resetSearchString() {
    this.searchString = null;
  }

  logout() {
    this.authService.logout();
    this.isMenuOpen = false;
    this.router.navigate(['/']);
  }

}
