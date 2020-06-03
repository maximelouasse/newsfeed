/*
Import
*/
  // Angular
  import { Component, OnInit, Output, EventEmitter } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//

/*
Component configuration
*/
  @Component({
    selector: 'app-form-login',
    templateUrl: './form-login.component.html',
  })
//

/*
Component class definition
*/
  export class FormLoginComponent implements OnInit {

    // Declarations
    public formData: FormGroup;

    @Output() formSubmit = new EventEmitter();

    constructor( private FormBuilder: FormBuilder ) { }

    // Method to reset form
    private resetForm = ()  => {
      this.formData = this.FormBuilder.group({
          email: [ null, Validators.required ],
          password: [ null, Validators.required ]
      });
    };

    ngOnInit(): void {
      this.resetForm();
    }
  }
//
