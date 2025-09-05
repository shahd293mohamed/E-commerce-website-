import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart-service';
import { ICartItem, ICartResponse } from '../../core/model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order-service';

@Component({
  selector: 'app-carts',
  imports: [CommonModule],
  templateUrl: './carts.html',
  styleUrl: './carts.css'
})
export class Carts implements OnInit {
items: ICartItem[] = [];
totalPrice: number = 0;

  constructor(private cartService: CartService, private orderService: OrderService) {}

  ngOnInit(): void {
    // this.cartService.getCart().subscribe((res: ICartResponse) => {
    //   this.items = res.items;  // بس بنمسك الـ items
    //   this.totalPrice = this.items.reduce(
    //     (acc, item) => acc + item.quantity * item.product.price,
    //     0
    //   );
    //   console.log(res.items.map(item => item.product.img));
      
    // });
    this.cartService.getCart().subscribe((res: ICartResponse) => {
  this.items = res.items.filter(item => item.product); // keep only items with product
  this.updateTotal();
});

    
  }
    checkout() {
    this.orderService.createOrder().subscribe({
      next: (res) => {
        alert('Order placed successfully!');
        console.log(res);
      },
      error: (err) => {
        alert('Failed to place order');
        console.error(err);
      }
    });
  }
  increaseQty(item: ICartItem) {
  item.quantity++;
  this.updateTotal();
}

decreaseQty(item: ICartItem) {
  if (item.quantity > 1) {
    item.quantity--;
    this.updateTotal();
  }
}

// updateTotal() {
//   this.totalPrice = this.items.reduce(
//     (acc, item) => acc + item.quantity * item.product.price,
//     0
//   );
// }
updateTotal() {
  this.totalPrice = this.items.reduce(
    (acc, item) => acc + item.quantity * (item.product?.price || 0),
    0
  );
}

  getImageUrl(imgPath: string): string {
  if (!imgPath) return 'assets/default.jpg'; // fallback if needed
  return 'http://localhost:3000/' + imgPath.replace(/\\/g, '/');
}
removeItem(item: ICartItem) {
  this.cartService.removeFromCart(item.product._id).subscribe({
    next: () => {
      this.items = this.items.filter(i => i.product._id !== item.product._id);
      this.updateTotal();
    },
    error: (err) => {
      console.error('Failed to remove item:', err);
      alert('Could not remove item from cart');
    }
  });
}
getPriceChangedItems(): ICartItem[] {
  return this.items.filter(item => item.priceSnapshot !== item.product.price);
}

getOutOfStockItems(): ICartItem[] {
  return this.items.filter(item => item.product.stock === 0);
}
acceptNewPrice(item: ICartItem) {
  item.priceSnapshot = item.product.price;
}
}
