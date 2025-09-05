import { Component } from '@angular/core';
import { CategoryService } from '../../../core/services/category-service';
import { Icategory, IcategoryRes } from '../../../core/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-getallcategories',
  imports: [CommonModule],
  templateUrl: './getallcategories.html',
  styleUrl: './getallcategories.css'
})
export class Getallcategories {
  categories!:Icategory[]
  constructor(private _categoryService:CategoryService) { }

  ngOnInit() {
  this._categoryService.getCategoriesTree().subscribe(res => {
    this.categories = res.data; // ✅ Extract the array from the response
    console.log(this.categories); // Should now log an array
  });

      this._categoryService.getCategoriesTree().subscribe(data => {
  console.log(data); // Check this first
  this.categories = data; // Might be incorrect
});

    
  }

//   ngOnInit() {
//   this._categoryService.getCategoriesTree().subscribe(data => {
//     this.categories = data.categories; // or whatever the correct key is
//     console.log(this.categories); // should now be an array
//   });
// }


}
