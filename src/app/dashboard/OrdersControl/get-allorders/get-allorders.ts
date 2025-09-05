import { Component } from '@angular/core';
import { OrderService } from '../../../core/services/order-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-allorders',
  imports: [CommonModule, FormsModule],
  templateUrl: './get-allorders.html',
  styleUrl: './get-allorders.css'
})
export class GetAllorders {
  constructor(private _orderService:OrderService) { }
  statusOptions = [
  "pending",
  "preparing",
  "ready_for_shipping",
  "shipped",
  "received",
  "rejected",
  "cancelled"
];

orders: any[] = [];

ngOnInit() {
  this._orderService.getOrders().subscribe((res) => {
    this.orders = res.orders;
  });
}

updateStatus(order: any) {
  const body = {
    statusOfOrder: order.statusOfOrder,
    cancelledByWho: order.statusOfOrder === "cancelled" ? "admin" : undefined,
    cancellationReason: order.statusOfOrder === "cancelled" ? "Cancelled by admin" : undefined
  };

  this._orderService.updateOrder(order._id, body).subscribe({
    next: () => alert("Order updated"),
    error: (err) => console.error(err)
  });
}

}
