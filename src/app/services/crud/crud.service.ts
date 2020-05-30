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
export class CrudService {

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
  CRUD methods
  */
    // CRUD method: create item
    public createItem(endpoint: String, data: any): Promise<any> {
      // Launch request
      return this.HttpClient.post(`${environment.apiUrl}/${endpoint}`, data, this.setHeaderRequest())
      .toPromise()
      .then( data => this.getData(endpoint, data))
      .catch(this.handleError);
    };

    // CRUD method: edit an item
    public updateItem(endpoint: String, _id: String, data: any): Promise<any> {
      // Launch request
      return this.HttpClient.put(`${environment.apiUrl}/${endpoint}/${_id}`, data, this.setHeaderRequest())
      .toPromise()
      .then( data => this.getData(endpoint, data))
      .catch(this.handleError);
      };

    // CRUD method: delete an item
    public deleteItem(endpoint: String, _id: String): Promise<any> {
      // Launch request
      return this.HttpClient.delete(`${environment.apiUrl}/${endpoint}/${_id}`, this.setHeaderRequest())
      .toPromise()
      .then( data => this.getData(endpoint, data))
      .catch(this.handleError);
    };

    // CRUD method: read item
    public readOneItem(endpoint: String, param: String): Promise<any> {
        return this.HttpClient.get(`${environment.apiUrl}/${endpoint}?${param}`)
        .toPromise()
        .then( data => this.getData(endpoint, data))
        .catch(this.handleError);
    };

    // CRUD method: read all items
    public readAllItems(endpoint: String): Promise<any> {
      return this.HttpClient.get(`${environment.apiUrl}/${endpoint}/`)
      .toPromise()
      .then( data => this.getData(endpoint, data))
      .catch(this.handleError);
    };

    public login(endpoint: String, data: any): Promise<any> {
      // Launch request
      return this.HttpClient.post(`${environment.apiUrl}/${endpoint}`, data, this.setHeaderRequest())
      .toPromise()
      .then( data => this.getData(endpoint, data))
      .catch(this.handleError);
    }
  //

  /*
  Methods to get API responses
  */
    // Get the API response
    private getData = (endpoint, apiResponse: any) => {
      console.log(apiResponse);
      // Switch endpoint to set observable value
      switch(endpoint) {
        case 'users':
          // Set user info obserrbale value
          this.ObservablesService.setObservableData('users', apiResponse[0])
          break;

        case 'posts':
          // Set user info obserrbale value
          this.ObservablesService.setObservableData('posts', apiResponse)
          break;

        case 'login':

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
