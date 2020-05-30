import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";
import { ObservablesService } from "../../services/observable/observable.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit {

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

  public getUserInfo = ( data: any ) => {
    // Get user infos
    this.AuthService.login({ 'email': data.email, 'password': data.password })
    .then( userInfo => {
      console.log('SUCCES request', data);
      this.userIsLoaded = true;
      this.Router.navigateByUrl('/connected');
    })
    .catch( error => {
      console.log('ERROR request', error);
    });
  };

  public getIdentity = ( token: String ) => {
    // Get user infos
    this.AuthService.identity({ 'token': token })
    .then( userInfo => {
      console.log('SUCCES request', userInfo);
      this.userIsLoaded = true;
      this.Router.navigateByUrl('/connected');
    })
    .catch( error => {
      console.log('ERROR request', error);
    });
  }

  public registerUser( data: any ) {
    this.AuthService.register({ 'email': data.email, 'password': data.password, 'firstname': data.firstname, 'lastname': data.lastname });
  }

  public getSource( sourceId: any ) {
    this.ObservablesService.getObservableData('sources').subscribe( sourceListObserver => {
      // Check value
      if( sourceListObserver === null) { this.currentSource = null }
      else {
        sourceListObserver.forEach(element => {
          if(element.id == sourceId) {
            this.currentSource = element;
            console.log(element);
          }
        });
      }
    });
  }

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
    if(localStorage.getItem('local-token') != undefined) {
      this.getIdentity(localStorage.getItem('local-token'));
    } else {
      this.userIsLoaded = false;
    }

    if(localStorage.getItem('last-search') != undefined) {
      this.getSource(localStorage.getItem('last-search'));
    }
  }

}
