import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-done',
  imports: [],
  templateUrl: './done.html',
  styleUrl: './done.css',
})
export class Done {
  constructor(private router: Router) {}

  backToHome() {
    this.router.navigate(['products']);
  }
}
