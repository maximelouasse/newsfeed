/*
Import
*/
  // Angular
  import { Component, OnInit, Output, EventEmitter } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";

  // Inner
  import { ObservablesService } from "../../services/observable/observable.service";
  import { NewsService } from "../../services/news/news.service";
//

/*
Componant configuration
*/
  @Component({
    selector: 'app-bookmark-list',
    templateUrl: './bookmark-list.component.html',
    styles: [
    ]
  })
//

/*
Componant class definition
*/
  export class BookmarkListComponent implements OnInit {

    /*
    Declarations
    */
    public bookmarksList: any;
    //

    constructor( private ObservablesService: ObservablesService, private NewsService: NewsService, private FormBuilder: FormBuilder ) {
      // Get user bookmarks observer
      this.ObservablesService.getObservableData('bookmarks').subscribe( bookmarksListObserver => {
        // Check value
        if( bookmarksListObserver === null) { this.bookmarksList = null }
        else { this.bookmarksList = bookmarksListObserver}
      });
    }

    /*
    Methods
    */
      public getSources(source: any) {
        this.NewsService.getNews(source);
      }
    //

    /*
    Hooks
    */
      ngOnInit(): void {
      }
    //
  }
//
