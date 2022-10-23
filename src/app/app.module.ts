import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { CourseComponent } from './courses/course/course.component';
import { FormComponent } from './form/form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';

const appRoute: Routes = [
	//{path: '', redirectTo: 'Home', pathMatch: 'full'},    //Routes is an array of route objects. when the user enters root url we want to redirect him to Home.  pathmatch property tells the router how to match the url. full means path is matched to entire url. redirectTo property - specifies the path to which we want to redirect the user when he enters root url.   redirection happens here.
	{path: '', component: HomeComponent},               // empty string means default route -for root url (localhost:4200)  - no redirection
	{path: 'Home', component: HomeComponent},	       //pathMatch property tells how to match the url.
	{path: 'About', component: AboutComponent},
	{path: 'Contact', component: ContactComponent},	  // 'full' - path is matched to entire url
  {path: 'Courses', component: CoursesComponent},
  {path: 'Courses/Course/:id', component: CourseComponent}, //value of id will be set dynamically based on what value is typed in url. for this we need to use a colon before id.  you can add as many parameters as you want.
  {path: 'Form', component: FormComponent},
  // {path: '', children: [
  //   {path: 'Course/:id', component: CourseComponent}
  // ] },
	{path: '**', component: ErrorComponent}       // '**' - wild card routes. if user entered path that does not match any route then this is the path they are routed to. should be added at last. The order of the route matters because the wild card route matches every url we keep it at last.
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    CoursesComponent,
    CourseComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute)       // our app doesn't know about the routes array appRoute we created so we need to import RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
