import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryName: String;
  allCategories: String;

  constructor(private categoryService: CategoryService, private router: Router) {
    this.categoryService.listen().subscribe((data: any) => {
      this.loadCategories();
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(){
    this.categoryService.getAllCategories().subscribe((data: any) => {
      if (data.result === 1) {
        this.allCategories = data.data;
      } else if (data.result === 0) {
        console.log('No Data');
      }
    });
  }

  onSubmitNewCategory(){
    const newCategory = {
      categoryName: this.categoryName
    }

    this.categoryService.addNewCategory(newCategory).subscribe((data: any) => {
      if (data.result === 1) {
        this.categoryName = "";

        alert("New Category Added");
        this.loadCategories();
      } else if (data.result === 0) {
        alert("Something went wrong");
      }
    });
  }

  updateCategory(id, categoryName){

    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        categoryName: categoryName,
      }
    }
    this.router.navigate(["/home/category/editCategory"], navigationExtras);
  }

  deleteCategory(id){
    const deleteCategoryParams = {
      id: id
    }

    var confirmation = confirm("Do you want to delete this category ?");

    if (confirmation == true) {
      this.categoryService.deleteCategory(deleteCategoryParams).subscribe((data: any) => {
        if (data.result === 1) {
          alert('Category deleted');
          this.loadCategories();
        } else if (data.result === 0) {
          alert('Something went wrong');
        }
      });
    } else {
      alert("Deletion Cancelled");
    }
  }

}
