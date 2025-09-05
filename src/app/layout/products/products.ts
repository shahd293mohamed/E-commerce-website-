// import { Component, OnInit } from '@angular/core';
// import { ProductsServices } from '../../core/services/products-services';
// import { Iproduct, IproductsRes } from '../../core/model';
// import { FormControl, FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-products',
//   imports: [CommonModule,RouterLink],
//   templateUrl: './products.html',
//   styleUrl: './products.css'
// })
// export class Products implements OnInit {
//   constructor(private _productService:ProductsServices) { }
//   myProducts!:Iproduct[]

//   ngOnInit(): void {
//     this._productService.getProducts().subscribe(res=>
//       {this.myProducts=res.products
//         console.log(this.myProducts);

//       });
    
//   }


// }


import { Component, OnInit } from '@angular/core';
import { ProductsServices } from '../../core/services/products-services';
import { Iproduct } from '../../core/model';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart-service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  constructor(
    private _productService: ProductsServices,
    private route: ActivatedRoute,
    private _cartService: CartService
  ) {}

  myProducts!: Iproduct[];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoryName = params['categoryName'];
      const subCategory = params['subCategory'];

      if (categoryName) {
        this._productService
          .getProductsByCategory(categoryName, subCategory)
          .subscribe(res => {
            this.myProducts = res.products;
            console.log('API Response:', res);
            
            console.log('Filtered Products:', this.myProducts);
          });
      } else {
        // fallback: load all products
        this._productService.getProducts().subscribe(res => {
          this.myProducts = res.products;
        });
      }
    });
  }
  // addToCart(productId: string, quantity: number) {
  //   this._cartService.addToCart(productId, quantity);
  // }
  addToCart(productId: string, quantity: number, price: number) {
  this._cartService.addToCart(productId, quantity, price).subscribe({
    next: (res) => {
      console.log('Added to cart:', res);
      // you could also show a toast notification here
    },
    error: (err) => {
      console.error('Error adding to cart:', err);
    }
  });
}
getImageUrl(imgPath: string): string {
  if (!imgPath) return 'assets/default.jpg'; // fallback if needed
  return 'http://localhost:3000/' + imgPath.replace(/\\/g, '/');
}

}
