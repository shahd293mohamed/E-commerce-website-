import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsServices } from '../../../core/services/products-services';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css'
})
export class UpdateProduct implements OnInit {
  productId!: string;

  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    img: new FormControl(null), // ✅ for file upload
    stock: new FormControl(''),
    route: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private _productService: ProductsServices
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this._productService.getProductRoute(this.productId).subscribe(res => {
      const p = res.product;
      this.myForm.patchValue({
        title: p.title,
        price: p.price,
        description: p.description,
        stock: p.stock,
        route: p.route
      });
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({ img: file });
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.myForm.value.title);
    formData.append('price', this.myForm.value.price);
    formData.append('description', this.myForm.value.description);
    formData.append('stock', this.myForm.value.stock);
    formData.append('route', this.myForm.value.route);

    if (this.myForm.value.img) {
      formData.append('img', this.myForm.value.img); // ✅ must match backend field
    }

    this._productService.updateProduct(this.productId, formData).subscribe({
      next: res => {
        console.log('Product updated:', res);
        alert('Product updated successfully!');
      },
      error: err => {
        console.error('Update failed:', err);
        alert('Failed to update product.');
      }
    });
  }
}

