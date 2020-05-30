import { Component, OnInit } from '@angular/core';
import { ObservablesService } from '../../services/observable/observable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent implements OnInit {

  /*
  Declaration
  */
      // Properties
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

          // Get user bookmark observer
          /*this.ObservablesService.getObservableData('user-bookmarks').subscribe( userBookmarkObserver => {
            if(userBookmarkObserver === null) { this.userBookmarks = null}
            else { this.userBookmarks = userBookmarkObserver }
          });*/
      }

      // Methods
      public logout() {
        localStorage.removeItem('local-token');
        // Set user info observabale value
        this.ObservablesService.setObservableData('logout', null);
        this.Router.navigateByUrl('/');
      }
  //

  ngOnInit(){};
};
