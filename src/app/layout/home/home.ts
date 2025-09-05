// // 

// import { Component, OnInit } from '@angular/core';
// import { ProductsServices } from '../../core/services/products-services';
// import { CategoryService } from '../../core/services/category-service';
// import { Iproduct, Icategory } from '../../core/model';
// import { CommonModule } from '@angular/common';
// import { Router, RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   imports: [CommonModule, RouterLink],
//   templateUrl: './home.html',
//   styleUrl: './home.css'
// })
// export class Home implements OnInit {
//   products: Iproduct[] = [];
//   mainCategories: Icategory[] = [];

//   constructor(
//     private productService: ProductsServices,
//     private categoryService: CategoryService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.productService.getProducts().subscribe((res: any) => {
//       this.products = res.products;
//     });

//     this.categoryService.getCategories().subscribe((res: any) => {
//       const allCategories: Icategory[] = res.categories;
//       this.mainCategories = allCategories.filter(cat => cat.parent === null);
//     });
//   }

//   onMainCategoryClick(category: Icategory) {
//     this.router.navigate(['/products'], {
//       queryParams: { categoryName: category.name }
//     });
//   }

//   getImageUrl(imgPath: string): string {
//     if (!imgPath) return 'assets/default.jpg';
//     return 'http://localhost:3000/' + imgPath.replace(/\\/g, '/');
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ProductsServices } from '../../core/services/products-services';
import { CategoryService } from '../../core/services/category-service';
import { Iproduct, Icategory } from '../../core/model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  products: Iproduct[] = [];
  mainCategories: Icategory[] = [];

  // Sorting state
  sortBy: string = 'createdAt'; // default sort field
  order: string = 'desc';       // default sort order

  constructor(private productService: ProductsServices,private categoryService: CategoryService,
    private router: Router, private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();

    this.categoryService.getCategories().subscribe((res: any) => {
      const allCategories: Icategory[] = res.categories;
      this.mainCategories = allCategories.filter(cat => cat.parent === null);
    });
  }
  fetchProducts(): void {
    this.productService.getProducts(this.sortBy, this.order).subscribe((res: any) => {
      this.products = res.products;
    });
  }
 onSortChange(sortBy: string, order: string): void {
  this.sortBy = sortBy;
  this.order = order;
  this.fetchProducts();
}
  onMainCategoryClick(category: Icategory): void {
    this.router.navigate(['/products'], {
      queryParams: { categoryName: category.name }
    });
  }
    addToCart(productId: string, quantity: number, price: number) {
  this._cartService.addToCart(productId, quantity, price).subscribe({
    next: (res) => {
      console.log('Added to cart:', res);
       alert('Added to cart');
    },
    error: (err) => {
      console.error('Error adding to cart:', err);
    }
  });
}
  getImageUrl(imgPath: string): string {
    if (!imgPath) return 'assets/default.jpg';
    return 'http://localhost:3000/' + imgPath.replace(/\\/g, '/');
  }
}