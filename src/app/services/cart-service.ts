import { EventEmitter, Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: IProduct[] = [];

  // to make quantity automatic refresh in cart icon in navbar like data flow from parent to child
  cartChanged = new EventEmitter<void>();

  constructor() {
    const savedProducts = localStorage.getItem('cart');
    if (savedProducts) {
      this.cart = JSON.parse(savedProducts);
    }
  }

  addToCart(product: IProduct) {
    const productExist = this.cart.find((p) => product.id === p.id);
    if (productExist) {
      // || 1 because quantity can be undefine
      productExist.quantity = (productExist.quantity || 1) + 1;
    } else {
      product.quantity = 1;
      this.cart.push(product);
    }
    this.saveCart();
  }

  getCart() {
    return this.cart;
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
    this.cartChanged.emit();
  }

  getTotalPrice(): number {
    return this.cart.reduce((sum, el) => sum + el.price * (el.quantity || 1), 0);
  }

  getTotalQuantity(): number {
    return this.cart.reduce((sum, el) => sum + (el.quantity || 1), 0);
  }

  increaseQuntity(productId: number) {
    const product = this.cart.find((p) => p.id === productId);
    if (product) {
      product.quantity = (product.quantity || 1) + 1;
      this.saveCart();
    }
  }

  decreaseQuntity(productId: number) {
    const product = this.cart.find((p) => p.id === productId);
    if (product) {
      if (product.quantity && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        this.cart = this.cart.filter((p) => p.id !== productId);
      }
      this.saveCart();
    }
  }

  processDone() {
    this.cart = [];
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartChanged.emit();
  }
}
