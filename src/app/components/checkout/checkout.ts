import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  cart: IProduct[] = [];
  total: number = 0;

  constructor(private _cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cart = this._cartService.getCart();
    this.total = this._cartService.getTotalPrice();
  }
}
