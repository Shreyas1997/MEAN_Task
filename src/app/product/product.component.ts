import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  allProducts: any;

  constructor( private router: Router, private productService: ProductServiceService) {
    this.productService.listen().subscribe((data: any) => {
      this.loadProducts();
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getAllProducts().subscribe((data: any) => {
      if (data.result === 1) {
        this.allProducts = data.data;
      } else if (data.result === 0) {
        console.log('No Data');
      }
    });
  }

  updateProduct(id, productName, productPrice, productSize, category, productStock, productDescription){

    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
        productName: productName,
        productPrice: productPrice,
        productSize: productSize,
        category: category,
        productStock: productStock,
        productDescription: productDescription
      }
    }
    this.router.navigate(["/home/product/editProduct"], navigationExtras);
  }

  deleteProduct(id){
    const deleteProductParams = {
      id: id
    }

    var confirmation = confirm("Do you want to delete this product ?");

    if (confirmation == true) {
      this.productService.deleteProduct(deleteProductParams).subscribe((data: any) => {
        if (data.result === 1) {
          alert('Product deleted');
          this.loadProducts();
        } else if (data.result === 0) {
          alert('Something went wrong');
        }
      });
    } else {
      alert("Deletion Cancelled");
    }
  }

}
