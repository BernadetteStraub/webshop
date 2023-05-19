import { Component } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {filter, map, Observable, of, switchMap} from "rxjs";
import {combineLatest} from "rxjs";

interface OrderViewModel {
  id: number;
  createdAt: Date;
  userId: number;
  items: {
    title: string,
    price: number,
    quantity: number,
    size: number,
  }[];
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders$: Observable<OrderViewModel[] | null>; // Replace with your order type

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.orders$ = this.authService.currentUser$.pipe(
      filter(user => !!user),
      switchMap(user => {
        if(user){
          return combineLatest([this.apiService.getAllOrdersForUser(user.id), this.apiService.getAllProducts()]);
        }
        return of([null, null]);
      }),
      map(([orders, products]) => {
        if(orders && orders.length > 0){
          return orders.map(order => {
            const orderViewModel: OrderViewModel = {
              id: order.id,
              createdAt: order.createdAt,
              userId: order.userId,
              items: order.items.map(item => {
                const product = products?.find(product => product.id === item.productId);
                return {
                  title: product?.title || '',
                  price: product?.price || 0,
                  quantity: item.quantity,
                  size: item.size,
                }
              }),
            };
            return orderViewModel;
          });
        }
        return null;
      })
    )
  }
}
