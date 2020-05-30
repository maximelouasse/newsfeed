import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// Inner
import { ObservablesService } from "../../services/observable/observable.service";
import { NewsService } from "../../services/news/news.service";

@Component({
  selector: 'app-news-selector',
  templateUrl: './news-selector.component.html',
  styles: [
  ]
})

export class NewsSelectorComponent implements OnInit {

  // Declarations
  public formData: FormGroup;
  public sourcesList: any;
  public userInfo: any;
  public currentSourceId: any;
  public bookmarksList: any;
  public isBookmarked: boolean = false;

  @Output() formSubmit = new EventEmitter();
  @Output() sourceChanged = new EventEmitter();

  constructor( private ObservablesService: ObservablesService, private NewsService: NewsService, private FormBuilder: FormBuilder ) {
    // Get user data observer
    this.ObservablesService.getObservableData('sources').subscribe( sourceListObserver => {
      // Check value
      if( sourceListObserver === null) { this.sourcesList = null }
      else { this.sourcesList = sourceListObserver}
    });

    // Get user data observer
    this.ObservablesService.getObservableData('users').subscribe( userInfoObserver => {
      // Check value
      if( userInfoObserver === null) { this.userInfo = null }
      else { this.userInfo = userInfoObserver}
    });

    // Get user bookmark observer
    this.ObservablesService.getObservableData('bookmarks').subscribe( bookmarksListObserver => {
      // Check value
      if( bookmarksListObserver === null) { this.bookmarksList = null }
      else { this.bookmarksList = bookmarksListObserver}
    });
  }

  public getSources = (data: any) => {
    localStorage.setItem('last-search', data.value.source);
    this.currentSourceId = data.value.source;
    this.NewsService.getNews(data.value.source, data.value.keyword);
    this.sourceChanged.emit(data.value.source);
  }

  // Method to reset form
  public resetForm = () => {
    this.formData = this.FormBuilder.group({
      source: [ null ],
      keyword: [ null ]
    });

    this.currentSourceId = null;
  };

  public addBookmark() {
    this.sourcesList.forEach(element => {
      if(element.id == this.currentSourceId) {
        let data = element;
        data.token = localStorage.getItem('local-token');
        this.NewsService.addBookmark(data);
      }
    });
    this.isBookmarked = true;
  }

  public deleteBookmark() {
    let bookmarkId;

    this.bookmarksList.forEach(element => {
      if(element.id == this.currentSourceId) {
        bookmarkId = element._id;
      }
    });

    this.NewsService.deleteBookmark(bookmarkId, { "token": localStorage.getItem('local-token') });
    this.isBookmarked = false;
  }

  public onChangeSource(event) {
    this.isBookmarked = false;
    this.currentSourceId = event.target.value;

    if(this.bookmarksList != null) {
      this.bookmarksList.forEach(element => {
        if(element.id == this.currentSourceId) {
          this.isBookmarked = true;
        }
      });
    }
  }

  ngOnInit(): void {
    this.resetForm();

    if(localStorage.getItem('last-search') != null) {
      this.NewsService.getNews(localStorage.getItem('last-search'));
      this.currentSourceId = localStorage.getItem('last-search');
    }
  }

}
