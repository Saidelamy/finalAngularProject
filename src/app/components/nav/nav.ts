import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  cartQuantity: number = 0;
  constructor(private router: Router, private _cartService: CartService) {}

  ngOnInit(): void {
    this.cartQuantity = this._cartService.getTotalQuantity();
    this._cartService.cartChanged.subscribe(() => {
      this.cartQuantity = this._cartService.getTotalQuantity();
    });
  }

  isLogged() {
    return localStorage.getItem('token');
  }

  logout() {
    this.router.navigate(['login']);
    localStorage.removeItem('token');
  }
}
