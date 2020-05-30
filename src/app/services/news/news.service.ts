/*
Imports
*/
  // Angular
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { HttpClient, HttpHeaders } from "@angular/common/http";

  // Inner
  import { ObservablesService } from '../observable/observable.service';
  import { AuthService } from '../auth/auth.service';
  import { environment } from 'src/environments/environment';
//

/*
Definition and export
*/
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private ObservablesService: ObservablesService, private AuthService: AuthService, private HttpClient: HttpClient ) {}

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

  public getSources(): Promise<any> {
    return this.HttpClient.get(`https://newsapi.org/v2/sources?apiKey=${environment.apiKey}`)
    .toPromise()
    .then( data => this.getData('sources', data))
    .catch(this.handleError);
  }

  public getNews( source: String, keyword: String = null): Promise<any> {
    return this.HttpClient.post(`${environment.apiUrl}/news/${source}/${keyword}`, { news_api_token: environment.apiKey })
    .toPromise()
    .then( data => this.getData('news', data))
    .catch(this.handleError);
  }

  public addBookmark( data: any ): Promise<any> {
    return this.HttpClient.post(`${environment.apiUrl}/bookmark`, data)
    .toPromise()
    .then( data => this.getData('bookmarks', data))
    .catch(this.handleError);
  }

  public deleteBookmark( id: any, data: any ): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: data,
    };
    return this.HttpClient.delete(`${environment.apiUrl}/bookmark/${id}`, options)
    .toPromise()
    .then( data => this.getData('bookmarks', data))
    .catch(this.handleError);
  }

  // Get observable value
  private getData = (endpoint: String, apiResponse: any): Observable<any> => {
    switch(endpoint) {
      case 'sources':
        this.ObservablesService.setObservableData('sources', apiResponse);
        break;

      case 'news':
        this.ObservablesService.setObservableData('news', apiResponse);
        break;

      case 'bookmarks':
        this.AuthService.identity({ "token": localStorage.getItem('local-token') });
        break;

      default:
        break;
    };

    return apiResponse || {};
  };

  private handleError = (apiError: any) => Promise.reject(apiError);
}
//
