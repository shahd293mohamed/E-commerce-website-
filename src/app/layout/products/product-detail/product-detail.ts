import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../../core/model';
import { ProductsServices } from '../../../core/services/products-services';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart-service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product!:Iproduct;
  constructor (private _productS:ProductsServices, private _activeRoute:ActivatedRoute, private _router:Router, private cartService:CartService) {}
  route!:string;
  ngOnInit(): void {
    this.route= this._activeRoute.snapshot.params['route'];
    if(this._activeRoute.snapshot.paramMap.get('route')){
     this._activeRoute.paramMap.subscribe(param =>{
       this.route = param.get('route')!
          this._productS.getProductRoute(this.route).subscribe(res=>
      {this.product = res.product
  })

  //   this._productS.getRelatedProducts(this.route).subscribe(res=>
  //     {this.relatedProducts = res.data
  // })
     } )


  }
  else {
    this._router.navigate(['/products']);
  }
  }

addToCart(productId: string, quantity: number, price: number) {
  this.cartService.addToCart(productId, quantity, price).subscribe({
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
