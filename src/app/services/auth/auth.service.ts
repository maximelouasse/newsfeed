// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { ObservablesService } from "../observable/observable.service";
//

/*
Definition
*/
@Injectable()
export class AuthService {

  // Inject module(s) in the service
  constructor( private HttpClient: HttpClient, private ObservablesService: ObservablesService ){};

  /*
  Method to set header
  */
    private setHeaderRequest = () => {
      // Set header
      let myHeader = new HttpHeaders();
      myHeader.append('Content-Type', 'application/json');

      // Return header
      return { headers: myHeader };
    }
  //

  /*
  AUTH methods
  */
    public register(data: any): Promise<any> {
      // Launch request
      return this.HttpClient.post(`${environment.apiUrl}/register`, data, this.setHeaderRequest())
      .toPromise()
      .then( data => this.getData('register', data))
      .catch(this.handleError);
    }

    public login(data: any): Promise<any> {
      // Launch request
      return this.HttpClient.post(`${environment.apiUrl}/login`, data, this.setHeaderRequest())
      .toPromise()
      .then( data => this.getData('login', data))
      .catch(this.handleError);
    }

    public identity(data: any): Promise<any> {
      // Launch request
      return this.HttpClient.post(`${environment.apiUrl}/me`, data, this.setHeaderRequest())
      .toPromise()
      .then( data => this.getData('users', data))
      .catch(this.handleError);
    }
  //

  /*
  Methods to get API responses
  */
    // Get the API response
    private getData = (endpoint, apiResponse: any) => {
      // Switch endpoint to set observable value
      switch(endpoint) {
        case 'login':
          // Set user info obserrbale value
          this.ObservablesService.setObservableData('login', apiResponse.data);
          break;

        case 'users':
          // Set user info obserrbale value
          this.ObservablesService.setObservableData('users', apiResponse.data);
          break;

        default:
          break;
      };

      // Retun data anytime
      return apiResponse || {};
    };

    // Get the API error
    private handleError = (apiError: any) => Promise.reject(apiError.error);

  //
};
//
