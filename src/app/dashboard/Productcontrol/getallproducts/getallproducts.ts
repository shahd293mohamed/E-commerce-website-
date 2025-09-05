import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../../core/model';
import { ProductsServices } from '../../../core/services/products-services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getallproducts',
  imports: [CommonModule],
  templateUrl: './getallproducts.html',
  styleUrl: './getallproducts.css'
})
export class Getallproducts implements OnInit {

  products: Iproduct[] = [];

  constructor(private _productService: ProductsServices, private _router: Router) {}

  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: res => {
        this.products = res.products;
      },
      error: err => {
        console.error('Error fetching products:', err);
      }
    });
  }
  goToUpdate(id: string) {
  this._router.navigate(['/dashboard/update-product', id]);
}
getImageUrl(imgPath: string): string {
  if (!imgPath) return 'assets/default.jpg'; // fallback if needed
  return 'http://localhost:3000/' + imgPath.replace(/\\/g, '/');
}


}

