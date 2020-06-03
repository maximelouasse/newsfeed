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
    selector: 'app-form-register',
    templateUrl: './form-register.component.html',
  })
//

/*
Component class definition
*/
  export class FormRegisterComponent implements OnInit {

    // Declarations
    public formData: FormGroup;

    @Output() formSubmit = new EventEmitter();

    constructor( private FormBuilder: FormBuilder ) { }

    // Method to reset form
    private resetForm = ()  => {
      this.formData = this.FormBuilder.group({
        firstname: [ null, Validators.required ],
        lastname: [ null, Validators.required ],
        email: [ null, Validators.required ],
        password: [ null, Validators.required ],
        repeat_password: [ null, Validators.required ]
      });
    };

    ngOnInit(): void {
      this.resetForm();
    }
  }
//
