import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {CartComponent} from "./components/cart/cart.component";
import {LoginComponent} from "./components/login/login.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {OrdersComponent} from "./components/orders/orders.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'product/:id', component: ProductDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
