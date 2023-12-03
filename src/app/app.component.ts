import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taskM_system';


  constructor(private router: Router) {
  }

  Createlist(){
    this.router.navigate(["create-list"])
  }

  Viewlist(){
    this.router.navigate(["view-list"])
  }

  CreateUser(){
    this.router.navigate(['create-user'])
  }

  viewUser(){
    this.router.navigate(['view-user'])
  }

  createtask(){
    this.router.navigate(['create-task'])
  }

  viewtask(){
    this.router.navigate(['view-task'])
  }

  createteam(){
    this.router.navigate(['team'])
  }

  createTeamTask(){
    this.router.navigate(["team-task"])
  }
}
