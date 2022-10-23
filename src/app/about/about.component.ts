import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  navigateToHome(methodType: string){
    if(methodType === 'navigate'){
      this.route.navigate(['Home'], {relativeTo: this.activatedRoute})  //home will be appended to currently active route (relative path)
    }
    if(methodType === 'navigateByUrl'){
      this.route.navigateByUrl('Home')
      
    }
  }

}


//how we can navigate to Home page from the About page programatically-

// In navigateToHome method we want to write a logic to navigate to home page.
// First thing we need is angular to inject an instance of Router class to this component class.


// this.route.navigate(['Home'])
// Inside the array we can specify the URL segments. we want to navigate to Home page so weve specified the path as Home.
// We can use anchor or button element


// 2. navigateByUrl
// when we use navigateByUrl then we need to pass a string.
// navigateToHome(){
// 	this.route.navigateByUrl('Home');
// }

///////////////////////////////////////////////////////////////////////////


// ** remember that both of these functions use ABSOLUTE path unless you provide a starting point.

// ** If you want to specify a relative path then you need access to currently active route. For that 
// you need to have an instance of  ActivatedRoute.

 
// ActivatedRoute class provides us access to information about a route associated with a component that is currently loaded in an outlet.
// Gives us information about currently activated route.

// Ex- 

// constructor(private route: Router, private activatedRoute: ActiveRoute){ }


// navigateToHome(){
// 	this.route.navigateByUrl('Home', {relativeTo: this.activatedRoute});
// }