/*
Imports
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
//

/*
Definition and export
*/
@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  constructor() {}

  // Init observable
  protected userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected postList: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected sourceList: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected token: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  protected bookmarksList: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Set observable value
  public setObservableData = (type: string, data: any) => {
    switch(type) {
      case 'users':
        this.userInfo.next(data.user);
        this.bookmarksList.next(data.bookmark);
        break;

      case 'login':
        // Set local storage
        if(data.token != 'undefined' || data.token != null) {
          localStorage.setItem('local-token', data.token );
        }
        this.userInfo.next(data.user);
        this.token.next(data.token);
        break;

      case 'logout':
        this.userInfo.next(data);
        break;

      case 'posts':
        this.postList.next(data);
        break;

      case 'news':
        this.postList.next(data);
        break;

      case 'sources':
        this.sourceList.next(data.sources);
        break;

      default:
        break;
    };
  };

  // Get observable value
  public getObservableData = (type: string) => {
    switch(type) {
      case 'users':
        return this.userInfo;

      case 'posts':
        return this.postList;

      case 'sources':
          return this.sourceList;

      case 'news':
        return this.postList;

      case 'bookmarks':
        return this.bookmarksList;

      default:
      break;
    };
  };
}
//
