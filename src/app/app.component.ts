/*
Import
*/
  // Angular
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';

  // Inner
  import { AuthService } from './services/auth/auth.service';
  import { ObservablesService } from './services/observable/observable.service';
  import { NewsService } from './services/news/news.service';
//

/*
Component configuration
*/
  @Component({
    selector: 'app-root',
    template: `
      <app-header></app-header>
      <router-outlet></router-outlet>
    `
  })
//

/*
Component class definition
*/
  export class AppComponent implements OnInit {

    constructor( private ObservablesService: ObservablesService, private AuthService: AuthService, private NewsService: NewsService, private Router: Router ){}

    async ngOnInit() {
      this.NewsService.getSources();

      if(localStorage.getItem('local-token') != null) {
        this.AuthService.identity({ "token": localStorage.getItem('local-token') })
        .then( apiResponse => {
          // Save user data
          this.ObservablesService.setObservableData('users', apiResponse.data);

          // Navigation to protected route
          this.Router.navigateByUrl('/connected');
        })
        .catch( error => console.log("Auto connection fail", error));
      }
    }
  }
//
