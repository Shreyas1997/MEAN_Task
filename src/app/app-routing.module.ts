import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSigninComponent } from "./user-signin/user-signin.component";
import { ProductComponent } from "./product/product.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { UpdateProductComponent } from "./update-product/update-product.component";
import { CategoryComponent } from "./category/category.component";
import { UpdateCategoryComponent } from "./update-category/update-category.component";
import { SizeComponent } from "./size/size.component";
import { UpdateSizeComponent } from "./update-size/update-size.component";
import { MenusComponent } from "./menus/menus.component";

import { GuardGuard } from './route_guard/guard.guard';

const routes: Routes = [
  { path: "", redirectTo: "/signIn", pathMatch: "full" },
  { path: "signIn", component: UserSigninComponent },
  {
    path: "home",
    component: MenusComponent,
    canActivate: [GuardGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: "product", component: ProductComponent },
      { path: "addProduct", component: AddProductComponent },
      { path: "product/editProduct", component: UpdateProductComponent },
      { path: "category", component: CategoryComponent },
      { path: "category/editCategory", component: UpdateCategoryComponent },
      { path: "size", component: SizeComponent },
      { path: "size/editSize", component: UpdateSizeComponent },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
