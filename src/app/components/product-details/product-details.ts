import { Component, input, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  eachProduct: IProduct | null = null;

  id: number = 0;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _productService: ProductService,
    private _cartService: CartService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this._activeRoute.snapshot.paramMap.get('id'));
    this._productService.getProductById(this.id).subscribe({
      next: (data) => {
        this.eachProduct = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(product: IProduct) {
    const token = localStorage.getItem('token');
    if (token) {
      this._cartService.addToCart(product);
      this.toastr.success(`${product.title} added successfully!`);
    } else {
      this.toastr.error(`You must login first, to can access to cart`);
      this.router.navigate(['/login']);
    }
  }
}
