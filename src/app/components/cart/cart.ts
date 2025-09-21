import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { CartService } from '../../services/cart-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cart: IProduct[] = [];
  total: number = 0;

  constructor(private _cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.loadCart();
  }

  compeleteCheckout() {
    this.router.navigate(['/checkout']);
  }

  loadCart() {
    this.cart = this._cartService.getCart();
    this.total = this._cartService.getTotalPrice();
  }

  increaseQountity(id: number) {
    this._cartService.increaseQuntity(id);
    this.loadCart();
  }

  decreseQountity(id: number) {
    this._cartService.decreaseQuntity(id);
    // use to refresh the cart after quantity reach to zero and the product hidden
    this.cart = this._cartService.getCart();
    this.loadCart();
  }

  removeProduct(index: number) {
    this._cartService.removeFromCart(index);
    this.loadCart();
  }

  clearCart() {
    this._cartService.clearCart();
    this.loadCart();
  }
}
