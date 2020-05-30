import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Router
import { RouterModule } from "@angular/router"
import { AppRouterModule } from "./app.router";

import { AppComponent } from './app.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { ConnectedPageComponent } from './routes/connected-page/connected-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { CrudService } from "./services/crud/crud.service";
import { AuthService } from "./services/auth/auth.service";
import { ObservablesService } from "./services/observable/observable.service";
import { ItemNewsComponent } from "./shared/item-news/item-news.component";
import { FormLoginComponent } from "./modules/form/form-login/form-login.component";
import { FormRegisterComponent } from "./modules/form/form-register/form-register.component";
import { NewsSelectorComponent } from './shared/news-selector/news-selector.component';
import { BookmarkListComponent } from './shared/bookmark-list/bookmark-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ConnectedPageComponent,
    HeaderComponent,
    ItemNewsComponent,
    FormLoginComponent,
    FormRegisterComponent,
    NewsSelectorComponent,
    BookmarkListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( AppRouterModule, { onSameUrlNavigation: 'reload' } ),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CrudService,
    AuthService,
    ObservablesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
