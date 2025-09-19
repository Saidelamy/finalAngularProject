import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  cart: IProduct[] = [];
  total: number = 0;

  constructor(
    private _cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cart = this._cartService.getCart();
    this.total = this._cartService.getTotalPrice();
  }

  processDone() {
    this._cartService.processDone();
    this.router.navigate(['done']);
    this.toastr.success('Payment Done Suceesully!');
  }
}
