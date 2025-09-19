import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Notfound } from './components/notfound/notfound';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Cart } from './components/cart/cart';
import { Products } from './components/products/products';
import { ProductDetails } from './components/product-details/product-details';
import { guestGuard } from './guards/guest-guard';
import { loginGuard } from './guards/login-guard';
import { Checkout } from './components/checkout/checkout';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'cart', component: Cart, canActivate: [loginGuard] },
  { path: 'checkout', component: Checkout, canActivate: [loginGuard] },
  { path: 'products', component: Products },
  { path: 'product-details/:id', component: ProductDetails },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Register, canActivate: [guestGuard] },
  { path: '**', component: Notfound },
];
