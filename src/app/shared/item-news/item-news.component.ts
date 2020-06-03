/*
Import
*/
    // Angular
    import { Component, OnInit, Input } from '@angular/core';
//

/*
Component configuration
*/
  @Component({
    selector: 'app-item-news',
    templateUrl: './item-news.component.html'
  })
//

/*
Component class definition
*/
  export class ItemNewsComponent implements OnInit {

      // Input  data from parent component
      @Input() post: any;

      constructor(){}
      ngOnInit(){};
  };
//
