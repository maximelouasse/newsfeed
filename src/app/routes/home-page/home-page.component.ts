/*
Import
*/
  // Angular
  import { Component, OnInit, Input } from '@angular/core';
  import { Router } from '@angular/router';

  // Inner
  import { AuthService } from "../../services/auth/auth.service";
  import { ObservablesService } from "../../services/observable/observable.service";
//

/*
Component configuration
*/
  @Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
  })
//

/*
Component class definition
*/
  export class HomePageComponent implements OnInit {

    // Declarations
    public userIsLoaded: Boolean = false;
    public postList: any;

    @Input() currentSource: any;

    constructor( private AuthService: AuthService, private ObservablesService: ObservablesService, private Router: Router ) {
      this.ObservablesService.getObservableData('news').subscribe( postListObserver => {
        // Check value
        if( postListObserver === null) { this.postList = null }
        else { this.postList = postListObserver.data.articles}
      })
    }

    // Method to login user infos
    public loginUser = ( data: any ) => {
      this.AuthService.login({ 'email': data.email, 'password': data.password })
      .then( userInfo => {
        console.log('SUCCESS request', data);
        this.userIsLoaded = true;
        this.Router.navigateByUrl('/connected');
      })
      .catch( error => {
        console.log('ERROR request', error);
      });
    };

    // Method to get user infos by token
    public getIdentity = ( token: String ) => {
      this.AuthService.identity({ 'token': token })
      .then( userInfo => {
        console.log('SUCCESS request', userInfo);
        this.userIsLoaded = true;
        this.Router.navigateByUrl('/connected');
      })
      .catch( error => {
        console.log('ERROR request', error);
      });
    }

    // Method to register user
    public registerUser( data: any ) {
      this.AuthService.register({ 'email': data.email, 'password': data.password, 'firstname': data.firstname, 'lastname': data.lastname }).
      then( registerData => {
        console.log('SUCCESS register', registerData);
        this.loginUser({email: registerData.data.identity.email, password: data.password});
      })
      .catch( error => {
        console.log('ERROR request', error);
      });
    }

    // Method to get source
    public getSource( sourceId: any ) {
      this.ObservablesService.getObservableData('sources').subscribe( sourceListObserver => {
        // Check value
        if( sourceListObserver === null) { this.currentSource = null }
        else {
          sourceListObserver.forEach(element => {
            if(element.id == sourceId) {
              this.currentSource = element;
            }
          });
        }
      });
    }

    // Method to change currentSource on change select source
    public sourceChangedHandler( event: any ) {
      this.ObservablesService.getObservableData('sources').subscribe( sourceListObserver => {
        // Check value
        if( sourceListObserver === null) { this.currentSource = null }
        else {
          sourceListObserver.forEach(element => {
            if(element.id == event) {
              this.currentSource = element;
            }
          });
        }
      });
    }

    ngOnInit(): void {
      // Login if local token
      if(localStorage.getItem('local-token') != undefined) {
        this.getIdentity(localStorage.getItem('local-token'));
      } else {
        this.userIsLoaded = false;
      }

      // Get last search of user
      if(localStorage.getItem('last-search') != undefined) {
        this.getSource(localStorage.getItem('last-search'));
      }
    }
  }
//
