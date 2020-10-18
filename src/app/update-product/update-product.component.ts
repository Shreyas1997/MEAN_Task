import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductServiceService } from '../services/product-service.service';
import { SizeService } from '../services/size.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id: String;
  productName: String;
  productPrice: String;
  productSize: Array<Object> = [];
  productUpdatedSize: Array<Object> = [];
  category: String;
  productStock: String;
  productDescription: String;
  allSizes: String;
  allCategories: String;

  constructor(private router: Router, private productService: ProductServiceService, private sizeService: SizeService, private categoryService: CategoryService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      id: String;
      productName: String;
      productPrice: String;
      productSize: Array<Object>;
      category: String;
      productStock: String;
      productDescription: String;
    }

    this.id = state.id;
    this.productName = state.productName;
    this.productPrice = state.productPrice;
    this.productSize = state.productSize;
    this.category = state.category;
    this.productStock = state.productStock;
    this.productDescription = state.productDescription;
  }

  ngOnInit(): void {
    this.loadSizes();
    this.loadCategories();
  }

  loadSizes(){
    this.sizeService.getAllSizes().subscribe((data: any) => {
      if (data.result === 1) {
        this.allSizes = data.data;
      } else if (data.result === 0) {
        console.log('No Data');
      }
    });
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

  
  onCheck(evt) {
    if(evt.target.checked == true){
      this.productUpdatedSize.push(evt.target.name);
    }
    if(evt.target.checked == false){
      var index = this.productUpdatedSize.indexOf(evt.target.name);
      if (index > -1) {
        this.productUpdatedSize.splice(index, 1);
      }
    }
  }

  onProductUpdate(id, productName, productPrice, category, productStock, productDescription) {
    const updateProductParams = {
      id: id,
      productName: productName,
      productPrice: productPrice,
      productUpdatedSize: this.productUpdatedSize,
      category: category,
      productStock: productStock,
      productDescription: productDescription
    };

    this.productService.updateProduct(updateProductParams).subscribe((data: any) => {
      if (data.result === 1) {
        alert(data.message);
        this.router.navigate(["/home/product"]);
      }
    },
      (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error.result === 0) {
          alert(err.error.message);
        }
      })
  }

}
