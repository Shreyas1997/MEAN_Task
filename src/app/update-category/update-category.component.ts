import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  id: String;
  categoryName: String;

  constructor(private router: Router, private categoryService: CategoryService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      id: String;
      categoryName: String;
    }

    this.id = state.id;
    this.categoryName = state.categoryName;
  }

  ngOnInit(): void {
  }

  onCategoryUpdate(id, categoryName) {
    const updateCategoryParams = {
      id: id,
      categoryName: categoryName
    };

    this.categoryService.updateCategory(updateCategoryParams).subscribe((data: any) => {
      if (data.result === 1) {
        alert(data.message);
        this.router.navigate(["/home/category"]);
      }
    },
      (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.result === 0) {
          alert(err.error.message);
        }
      })
  }

}
