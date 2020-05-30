/*
Imports
*/
    // Angular
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormsModule, ReactiveFormsModule } from '@angular/forms';

    // Inner
    import { FormLoginComponent } from "./form-login/form-login.component";
    import { FormRegisterComponent } from "./form-register/form-register.component";
//


/*
Definition & export
*/
    @NgModule({
        declarations: [ FormLoginComponent, FormRegisterComponent ],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule
        ],
        exports: [ FormLoginComponent, FormRegisterComponent ]
    })

    export class FormModule {};
//
