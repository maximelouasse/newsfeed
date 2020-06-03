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
Component configuration
*/
  @Component({
    selector: 'app-bookmark-list',
    templateUrl: './bookmark-list.component.html'
  })
//

/*
Component class definition
*/
  export class BookmarkListComponent implements OnInit {

    // Declarations
    public bookmarksList: any;

    @Output() sourceChanged = new EventEmitter();

    constructor( private ObservablesService: ObservablesService, private NewsService: NewsService, private FormBuilder: FormBuilder ) {
      // Get user bookmarks observer
      this.ObservablesService.getObservableData('bookmarks').subscribe( bookmarksListObserver => {
        if( bookmarksListObserver === null) { this.bookmarksList = null }
        else { this.bookmarksList = bookmarksListObserver}
      });
    }

    /*
    Methods
    */
      // Method to get news on click bookmark source
      public getNews( source: any ) {
        this.NewsService.getNews(source);
        this.sourceChanged.emit(source);
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
