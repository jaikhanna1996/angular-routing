import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses = [
    {id:'101', name: 'javascript for beginers 1', author: 'jai 1', duration: '101 seconds'},
    {id:'102', name: 'javascript for beginers 2', author: 'jai 2', duration: '102 seconds'},
    {id:'103', name: 'javascript for beginers 3', author: 'jai 3', duration: '103 seconds'},
    {id:'104', name: 'javascript for beginers 4', author: 'jai 4', duration: '104 seconds'},
    {id:'105', name: 'javascript for beginers 5', author: 'jai 5', duration: '105 seconds'},
    {id:'106', name: 'javascript for beginers 6', author: 'jai 6', duration: '106 seconds'},
    {id:'107', name: 'javascript for beginers 7', author: 'jai 7', duration: '107 seconds'},
    {id:'108', name: 'javascript for beginers 8', author: 'jai 8', duration: '108 seconds'},
    {id:'109', name: 'javascript for beginers 9', author: 'jai 9', duration: '109 seconds'}
  ]

  constructor() { }
}
