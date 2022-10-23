import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  reactiveForm: FormGroup;   //1. type of this property should be formgroup //2.import reactive forms module in app.module.ts   

  constructor() { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({  //3. first we're going to instantiate FormGroup. This form group constructor takes a javascript object as its argument. Now we need to setup our form controls. We can setup the controls using key-value pairs.
      // firstname: new FormControl(null, Validators.requiredTrue),         //4. for each of the html form controls (inputs) we need to create a javascript property of type FormControl. To this constructor we can pass a value that would be set as the deault value for that control.
      // lastname: new FormControl(null, Validators.required),
      // email: new FormControl(null, [Validators.required, Validators.email]),          //5. now we need to connect this form with our html form. to do that we'll use a directive called formGroup in html file.
      gender: new FormControl('male'),
      country: new FormControl('india'),
      hobbies: new FormControl(null), 
      skills: new FormArray([
        new FormControl(null, Validators.required)
      ]),   
      personalDetails: new FormGroup({
        firstname: new FormControl(null, [Validators.requiredTrue, this.noSpaceAllowed]), 
        lastname: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
        email: new FormControl(null, [Validators.required, Validators.email], this.emailNotAllowed),
      })
    });   
  }

  onSubmit(){
    console.log(this.reactiveForm);  //7. An object of type FormGroup is logged.
  }

  addSkills(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required))
  }


  noSpaceAllowed(control: FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){   //creating own custom validator
      return {noSpaceAllowed: true}
    }
    return null;
  }

  emailNotAllowed(control: FormControl):Promise<any> | Observable<any>{  
    const response = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'procademy@gmail.com'){       // this is an custom async validator.
          resolve({emailNotAllowed: true})
        }
        else{
          resolve(null)
        }
      },5000)
    })
    return response;
  }

}

//Reactive provides us more control with the form. 
//Structure of form is defined in the typescript class, ex- we create the form model with form Groups, Form Controls and Form Arrays.
//We also define the validation rules in the component class.
//Then we bind it to HTML form in the template.

////////////////////////////////////////////////////////

//  VALIDATION

// To use validation we need to import Validators from angular/forms

//suppose you want to make firstname as required field so you can pass in second argument in FormControl

//Example - firstname: new FormControl(null, Validators.required)
//when we have more than one valdators then we need to use an array. example - email: new FormControl(null, [Validators.required, Validators.email])
// more validators - https://angular.io/api/forms/Validators#description

////////////////////////////////////////////

//lets say if te formcontrl is invalid and if it is touched then we want to display a red border around the FormControl.
// we now that when the form is invalid then ng-invalid class will be automatically added to the form so we use that class in scss.

////////////////////////////////////////////////////////////////////

//GROUPING OF FORM CONTROL IN REACTIVE FORM

//suppose we want to create a formGroup which will have only firstname lastname and email controls. we can do thi in three steps.
//1. move these three form control in a container element
//2. on this container element we need to use the directive formGroupName. (here container is the div with id = "group")
//we need to assign a group to this directive but we cannot assign reactiveForm that we created because it contains control of all fields.
//so we add a new property in our formGroup with name personalDetails

//ex-       personalDetails: new FormGroup({
//   firstname: new FormControl(null, Validators.requiredTrue), 
//   lastname: new FormControl(null, Validators.required),
//   email: new FormControl(null, [Validators.required, Validators.email])
// })


///////////////////////////////////////////////////////////////////////////////////////////

//FORM ARRAY IN REACTIVE FORMS

//wHAT IS FORM ARRAY? - The FormArray is a way to manage the collectionof Form Controls in Angular. The controls can be a FormGroup, FormControl, or another FormArray.

//we've learned that we can group some form controls together using a FormGroup. So a FormGroup is also a collection of FormControls.
//FormArray is also a collection of FormControls.

//In Angular we can group FormControls using - 1.FormGroup, 2.FormArray
//Difference between these two is the way they implement it.

//In FormGroup controls becomes a property of the FormGroup. Each control is represented as key-value pair. FormGroup is an object.
// In FormArray, control does not become property of the form array. the controls becomes element of that array.  FormArray is an Array.

//ADVANTAGE OF FORM ARRAY? - We can generate form controls dynamically.

/////////////////////////////////////////////////////////////////////////////////////////

//CUSTOM VALIDATION AND ERROR CODE

//every validator has a error code and error code is nothing but a text returned by a validator when the validation fails on a form control.
//every validator returns a error code when the validation fails on a form control.

// how to create own custom validators??
//suppose we do not want user to enter space in first name feild. we create a method noSpaceAllowed().

//////////////////////////////////////////////////////////////////////////////

//Async validator must return a promise or an observable. Angular does not provide any built in async validator.

//We use async validator when we need to send HTTP request to the server to check if the data is valid.

//suppose we want to restrict user not to use proacademy@gmail.com. so for this we are going to create a async cusom validator. 
//So we create a method emailNotAllowed().

//when we want to use an async validator on a control we can pass it as the third argument of the form control constructor.
//ex - email: new FormControl(null, [Validators.required, Validators.email], this.emailNotAllowed)