import { Component, OnInit } from '@angular/core';
import { ProductsServices } from '../../../core/services/products-services';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addproduct',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addproduct.html',
  styleUrl: './addproduct.css'
})
export class Addproduct implements OnInit {

  categories: any[] = [];       // all categories (tree)
  mainCategories: any[] = [];   // only main
  subCategories: any[] = [];    // filtered subs
  selectedFile: File | null = null;

  constructor(private _productService: ProductsServices, private http: HttpClient) {}
  


  ngOnInit() {
    this.http.get<any>("http://localhost:3000/category/tree")
      .subscribe(res => {
        this.categories = res.data;
        this.mainCategories = this.categories; // root categories
      });
  }

  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    mainCategory: new FormControl(''), 
    subCategory: new FormControl(''),   
    img: new FormControl(null),
    stock: new FormControl(''),
    route: new FormControl(''),
  });

onMainCategoryChange() {
  const selectedMain = this.myForm.get('mainCategory')?.value;
  const mainCat = this.mainCategories.find(cat => cat.name === selectedMain);
  this.subCategories = mainCat?.children || [];
}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({ img: file });
    }
  }
  

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

onSubmit() {
  const formData = new FormData();
  formData.append('title', this.myForm.value.title);
  formData.append('price', this.myForm.value.price);
  formData.append('description', this.myForm.value.description);
  formData.append('stock', this.myForm.value.stock);
  formData.append('route', this.myForm.value.route);

  formData.append('category[main]', this.myForm.value.mainCategory);
  formData.append('category[sub]', this.myForm.value.subCategory);

  formData.append('img', this.myForm.value.img ); // ✅ must match upload.single("img")
  console.log(this.myForm.value.img);
  

  this._productService.addProduct(formData).subscribe({
    next: res => console.log('Product added:', res),
    error: err => console.error('Add product failed:', err)
  });

  this.myForm.reset();
}

}
