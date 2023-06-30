import {Component} from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {ProductResponse} from "../../interfaces/product.model";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent  {
  product$: Observable<ProductResponse | undefined>

  selectedSize: number | undefined;
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private cartService: CartService) {
    this.product$ = this.route.params.pipe(
      switchMap(params => this.apiService.getProductById(params["id"]))
    );
  }

  addToCart(product: ProductResponse) {
    if (this.selectedSize) {
      this.cartService.addToCart(
        product,
        this.quantity,
        this.selectedSize
      );
    }
  }

}
