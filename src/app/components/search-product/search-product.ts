import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-search-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-product.html',
  styleUrl: './search-product.css',
})
export class SearchProduct {
  searchQuery: string = '';
  // from child to parent
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchQuery);
  }
}
