/*
Imports
*/
    // Angular
    import { Routes } from '@angular/router';

    // Inner
    import { AuthGuard } from "./auth.guard";
    import { HomePageComponent } from './routes/home-page/home-page.component';
    import { ConnectedPageComponent } from './routes/connected-page/connected-page.component';
//

/*
Export
*/
    export const AppRouterModule: Routes = [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'connected',
        component: ConnectedPageComponent,
        canActivate: [ AuthGuard ]
      }
    ];
//
