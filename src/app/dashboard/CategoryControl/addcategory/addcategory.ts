import { Component } from '@angular/core';
import { CategoryService } from '../../../core/services/category-service';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addcategory',
  imports: [ReactiveFormsModule],
  templateUrl: './addcategory.html',
  styleUrl: './addcategory.css'
})
export class Addcategory {
  constructor(private _categoryService:CategoryService) { }
  myForm:FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    parent: new FormControl<string|null>(''),
  })

  onSubmit() {
    const formdata = new FormData();
    formdata.append('name', this.myForm.value.name);
    formdata.append('parent', this.myForm.value.parent);

    console.log(this.myForm.value);
    this._categoryService.addCategory(this.myForm.value).subscribe()
    this.myForm.reset();
  }

}
