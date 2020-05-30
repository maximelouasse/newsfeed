/*
Import
*/
    // Angular
    import { Component, OnInit, Input } from '@angular/core';
//

/*
Componant configuration
*/
    @Component({
        selector: 'app-item-news',
        templateUrl: './item-news.component.html'
    })
//


/*
Componant class definition
*/
    export class ItemNewsComponent implements OnInit {

        // Input  data from parent component
        @Input() post: any;

        constructor(){}
        ngOnInit(){};
    };
//
