import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiService} from "./services/api.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth.interceptor";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
registerLocaleData(en);

// Other imports...
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzButtonModule} from "ng-zorro-antd/button";
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzRadioModule} from "ng-zorro-antd/radio";
import { RegistrationComponent } from './components/registration/registration.component';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductDetailComponent,
    CartComponent,
    LoginComponent,
    UserProfileComponent,
    CheckoutComponent,
    OrdersComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzCarouselModule,
    NzIconModule,
    NzMenuModule,
    NzDropDownModule,
    NzGridModule,
    NzToolTipModule,
    NzCarouselModule,
    NzButtonModule,
    NzBadgeModule,
    NzSelectModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzInputNumberModule,
    NzImageModule,
    NzRadioModule
  ],
  providers: [ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
  ]
})
export class AppModule {
}
