import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Icategory } from '../../core/model';
import { CategoryService } from '../../core/services/category-service';
import { CommonModule } from '@angular/common';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  categories: Icategory[] = [];
  mainCategories: Icategory[] = [];
  subCategoriesMap: { [key: string]: Icategory[] } = {};

  constructor(
    private _categoryService: CategoryService,
    private router: Router,
    private _auth:Auth
  ) {}


    ngOnInit(): void {

    this._categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.categories;

      this.mainCategories = this.categories.filter(cat => cat.parent === null);

      this.subCategoriesMap = {};
      this.categories.forEach(cat => {
        if (cat.parent && typeof cat.parent === 'object') {
          const parentId = cat.parent._id;
          if (!this.subCategoriesMap[parentId]) {
            this.subCategoriesMap[parentId] = [];
          }
          this.subCategoriesMap[parentId].push(cat);
        }
      });
    });

  }

  onMainCategoryClick(category: Icategory) {
    this.router.navigate(['/products'], {
      queryParams: { categoryName: category.name }
    });
  }


  onSubCategoryClick(mainCategory: Icategory, subCategory: Icategory) {
    this.router.navigate(['/products'], {
      queryParams: { categoryName: mainCategory.name, subCategory: subCategory.name }
    });
  }
  logedin = false;
    name = '';
    logout(){
      this._auth.logout();
      this.logedin = false;
      this.name = '';
    }

  
  }

