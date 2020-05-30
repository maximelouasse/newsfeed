// Imports
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Inner
import { CrudService } from "./services/crud/crud.service";
import { AuthService } from "./services/auth/auth.service";

// Definition
@Injectable({ providedIn: 'root' })

// Export
export class AuthGuard implements CanActivate {

    constructor(
        private CrudService: CrudService,
        private AuthService: AuthService,
        private Router: Router,
    ){}


    canActivate(): Promise<any> {
        return new Promise( (resolve, reject) => {
          this.AuthService.identity({ 'token': localStorage.getItem('local-token')})
          .then( ( apiResponse ) => {
            if(apiResponse.err == null) { return resolve(true) }
            else { this.Router.navigateByUrl('/') };
          })
          .catch( ( apiResponse ) =>  this.Router.navigateByUrl('/'))
        })
    }
}
