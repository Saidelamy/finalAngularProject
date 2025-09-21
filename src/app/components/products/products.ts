import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { SearchProduct } from '../search-product/search-product';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart-service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, SearchProduct, CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: IProduct[] = [];
  pagedProducts: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  categories: string[] = [];

  currentPage = 1;
  totalPages = 0;
  numberOfProductsInPage = 8;

  searchTerm = '';
  selectedCategory = 'all';

  constructor(
    private router: Router,
    private _productService: ProductService,
    private _cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    console.log('Before subscribe');

    this._productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        // get category of sort equal all and another categories come from api and put them in array
        this.categories = ['all', ...new Set(this.products.map((p) => p.category))];
        console.log(this.categories, data);
        this.applyFilter();
      },
      error: (err) => console.error(err),
    });

    console.log('after subscribe');
  }

  applyFilter() {
    this.filteredProducts = this.products.filter((p) => {
      const matchFilter =
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchCategory = this.selectedCategory === 'all' || this.selectedCategory === p.category;

      return matchFilter && matchCategory;
    });

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.numberOfProductsInPage);
    this.updatePage();
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.numberOfProductsInPage;
    const end = start + this.numberOfProductsInPage;
    this.pagedProducts = this.filteredProducts.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  handleViewDetails(id: number) {
    this.router.navigate(['/product-details', id]);
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

  // mange pagination
  get pages(): number[] {
    // Array - create new array has length = total pages +1
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
