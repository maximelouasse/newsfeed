/*
Import
*/
  // Angular
  import { Component, OnInit, Input } from '@angular/core';

  // Inner
  import { CrudService } from "../../services/crud/crud.service";
  import { ObservablesService } from "../../services/observable/observable.service";
//

/*
Component configuration
*/
  @Component({
    selector: 'app-connected-page',
    templateUrl: './connected-page.component.html',
  })
//

/*
Component class definition
*/
  export class ConnectedPageComponent implements OnInit {

    /*
    Declarations
    */
    public newsCollection: any;
    public postList: any;

    @Input() currentSource: any;

    constructor(
      private CrudService: CrudService,
      private ObservablesService: ObservablesService
    ) {
      this.ObservablesService.getObservableData('news').subscribe( postListObserver => {
        // Check value
        if( postListObserver === null) { this.postList = null }
        else { this.postList = postListObserver.data.articles}
      })
    }
    //


    /*
    Methods
    */
      // Method to get the post list
      public getNewsList = async () => {
        this.newsCollection = await this.CrudService.readAllItems('news/sources');
      };

      // Method to change the current source on change select source
      public sourceChangedHandler( event: any ) {
        this.ObservablesService.getObservableData('sources').subscribe( sourceListObserver => {
          if( sourceListObserver === null) {
            this.currentSource = null
          } else {
            sourceListObserver.forEach(element => {
              if(element.id == event) {
                this.currentSource = element;
              }
            });
          }
        });
      }

      public getSource( sourceId: any ) {
        this.ObservablesService.getObservableData('sources').subscribe( sourceListObserver => {
          if( sourceListObserver === null) {
            this.currentSource = null
          } else {
            sourceListObserver.forEach(element => {
              if(element.id == sourceId) {
                this.currentSource = element;
              }
            });
          }
        });
      }
    //

    /*
    Hooks
    */
      ngOnInit(){
        // Get the poost list
        this.getNewsList();

        if(localStorage.getItem('last-search') != undefined) {
          this.getSource(localStorage.getItem('last-search'));
        }
      };
    //
  };
//
