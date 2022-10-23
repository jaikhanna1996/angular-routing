import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  


  routeParamObservable;
  course: any;
  courseId: any;       //we want to assign the courseId property with the value which we have in the route Ex - localhost:4200/Courses/Course/107 - we want to assign 107 to courseId
                       // for this we need accesss to the currently activated routr
  editMode: boolean= false;

  constructor(private actvatedRoute: ActivatedRoute,
    private router: Router, 
    private service: CoursesService
  ) { }

  ngOnInit(): void {
    // this.courseId = this.actvatedRoute.snapshot.params['id'];  //old approach
    // this.courseId = this.actvatedRoute.snapshot.paramMap.get('id');   //2.new approach  the snapshot property only returns the initial value of the route.
    // this.course = this.service.courses.find(x => x.id == this.courseId);

    this.routeParamObservable = this.actvatedRoute.paramMap.subscribe((param) => {       //next will have the value emitted by the observable.
      this.courseId = param.get('id');
      this.course = this.service.courses.find(x => x.id == this.courseId);
    })

    //getting queryParameter using snapshot property
    // this.editMode = Boolean(this.actvatedRoute.snapshot.queryParamMap.get('edit'));
    this.actvatedRoute.queryParamMap.subscribe((param) => {
      this.editMode = Boolean(param.get('edit'));        //getting value of queryparam using observable.
    })
    
  }

  ngOnDestroy(){
    this.routeParamObservable.unsubscribe();
  }

  appendQueryParam(){
    this.router.navigate(['/Courses/Course', this.courseId], {queryParams: {edit: true}})
  }

}

//////////////////////////////////////////////////////////
// IN THIS COMPONENT WE UNDERSTOOD HOW TO GET VALUE OF THE PARAMETER WE PASSED IN OUR ROUTE - {path: 'Courses/Course/:id', component: CourseComponent}, //value of id will be set dynamically based on what value is typed in url.

// the snapshot property only returns the initial value of the route. so for some reason if the value of the route parameter changes in that case this snapshot property will not return the updated value.
//if the parameter value is going to change over the time in that case instead of using snapshot property we can use an observable.

//the paramMap property returns an observable. we can subscribe to that observable to get value of parameter if it changes.


/////////////////////////////////////////////////////////////////
//QUERY PARAMETER

// Query parameter are optional parameter that you pass to a route. These query parameter are added at the end of the URL seprated by "?".
// Example - localhost:4200/Products?id=12345&&Name=iphone  in this URL the id and Name are the query parameters.

// Difference between route parameter and query parameter??
// Route parameter are used by angular to determine the route. They are part of the route definition. They are required.

//Query parameters are optional parameters. If query parameter are missing in the URL then it will not stop angular from navigation to the route. query parameter are not part of the route definition.

