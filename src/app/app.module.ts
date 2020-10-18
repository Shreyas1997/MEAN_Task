import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { CategoryComponent } from './category/category.component';
import { SizeComponent } from './size/size.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';

import { ProductServiceService } from './services/product-service.service';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateSizeComponent } from './update-size/update-size.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { MenusComponent } from './menus/menus.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    UserSigninComponent,
    CategoryComponent,
    SizeComponent,
    ProductComponent,
    AddProductComponent,
    UpdateProductComponent,
    UpdateSizeComponent,
    UpdateCategoryComponent,
    MenusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '531545575415-uamdranvsob6lrhbvgvup1fu63r95ds4.apps.googleusercontent.com'
          ),
        }
      ],
    } as SocialAuthServiceConfig,
  },
    ProductServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
