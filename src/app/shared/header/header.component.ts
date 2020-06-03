/*
Import
*/
  // Angular
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';

  // Inner
  import { ObservablesService } from '../../services/observable/observable.service';
//

/*
Component configuration
*/
  @Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
  })
//

/*
Component class definition
*/
  export class HeaderComponent implements OnInit {

    // Declarations
    public userData: any;
    public userBookmarks: any;

    constructor(
        private ObservablesService: ObservablesService,
        private Router: Router
    ){
        // Get user data observer
        this.ObservablesService.getObservableData('users').subscribe( userDataObserver => {
          if(userDataObserver === null) { this.userData = null}
          else { this.userData = userDataObserver }
        });
    }

    /*
    Methods
    */
      public logout() {
        localStorage.removeItem('local-token');
        // Set user info observabale value
        this.ObservablesService.setObservableData('logout', null);
        this.Router.navigateByUrl('/');
      }
    //

    ngOnInit(){};
  };
//
