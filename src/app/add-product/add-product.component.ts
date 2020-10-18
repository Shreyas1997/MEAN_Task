import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
import { SizeService } from '../services/size.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productName: any;
  productPrice: any;
  productSize: Array<Object> = [];
  category: any;
  productStock: any;
  productDescription: any;
  allSizes: any;
  allCategories: any;

  constructor(private router: Router, private productService: ProductServiceService, private sizeService: SizeService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadSizes();
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

  loadSizes(){
    this.sizeService.getAllSizes().subscribe((data: any) => {
      if (data.result === 1) {
        this.allSizes = data.data;
      } else if (data.result === 0) {
        console.log('No Data');
      }
    });
  }

  onCheck(evt) {
    if(evt.target.checked == true){
      this.productSize.push(evt.target.name);
    }
    if(evt.target.checked == false){
      var index = this.productSize.indexOf(evt.target.name);
      if (index > -1) {
        this.productSize.splice(index, 1);
      }
    }
  }

  onSubmitNewProduct(){
    const newProduct = {
      productName: this.productName,
      productPrice: this.productPrice,
      productSize: this.productSize,
      category: this.category,
      productStock: this.productStock,
      productDescription: this.productDescription
    };
    console.log(newProduct)

    this.productService.addNewProduct(newProduct).subscribe((data: any) => {
      if (data.result === 1) {
        this.productName = "";
        this.productPrice = "";
        this.productSize = [];
        this.productStock = "";
        this.productDescription = "";

        alert("New Product Added");
        this.router.navigate(["/home/product"]);
      } else if (data.result === 0) {
        alert("Something went wrong");
      }
    });
  }

}
