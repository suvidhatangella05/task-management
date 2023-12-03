import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TasksService } from 'src/app/services/tasks.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import {MatButtonModule} from '@angular/material/button';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { NgToastService } from 'ng-angular-popup';
import { TeamService } from 'src/app/services/team.service';
import { DatePipe } from '@angular/common';

export interface Task {
  name: string;
  priority: number;
  description: string;
  _id: string,
  dueDate:Date,
  teamName: string,
  state: string
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['name',  'description', 'priority','dueDate','teamName','state','action'];
  dataSource:any = new MatTableDataSource()
  team:any;
  teams: Task[] = [];
  errorMessage:any;

  constructor(
    private toast: NgToastService,
    private taskService: TasksService,
    private teamService: TeamService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {


  }
  ngOnInit() {
    this.taskService.getTasks()
      .subscribe((teams:any) => {
        this.teams = teams;
        this.dataSource = new MatTableDataSource(this.teams);
        console.log(teams);

      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.errorMessage = error;
  
        //throw error;   //You can also throw the error to a global error handler
      }
      )
  }
  currentDate = new Date();
  isDueDatePassed(dueDate:any) : boolean {
    const currentEpochMilliseconds = Date.now();
    const date = dueDate.getTime;
    console.log(currentEpochMilliseconds)

   //console.log(this.currentDate.getMilliseconds)
    console.log(  )
    return  Date.parse(dueDate) < currentEpochMilliseconds
  }
  addTask() {
    
    let team:Task = {
      name: '',
      priority: 0,
      description: '',
      _id: "",
      teamName: "",
      dueDate:  new Date(),
      state:""
    }
    
    const dialogRef = this.dialog.open(TasksDialog, {
  
      data: team
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(team.name !== "") {
      this.team = team;
      //team._id = "10";
    
      this.taskService.addNewTask(this.team).subscribe(
        
        (response) => {   
          console.log('response received'+response)
          this.showSuccessTopCenter("created successfully")   
          this.teams.push(response)
          this.dataSource.data = this.teams                     //Next callback

        },
        (error) => {                              //Error callback
          console.error('error caught in component'+ error.error)
          this.errorMessage = error.error;
          this.showError();
          //throw error;   //You can also throw the error to a global error handler
        }
      )
      }
    });
  }
  
  

  edittask(team:Task) {
    const dialogRef = this.dialog.open(TasksDialog, {
      width: '1000px',height:'700px',
      data: team
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.team = team;
      this.dataSource.data = this.teams
      console.log("updating data \n"+team)
      this.taskService.updateTask(this.team._id,this.team).subscribe(
        (response) => {                           //Next callback
          console.log('response received')
          this.showSuccessTopCenter("updated successfully")
        },
        (error) => {                              //Error callback
          console.error('error caught in component')
          this.errorMessage = error;
          this.showError();
          //throw error;   //You can also throw the error to a global error handler
        }
      )

    });
  }

  deletetask(team:Task) {
    let result = this.teams.findIndex((element,index) =>{
    return  element._id == team._id;
    })
    this.taskService.deleteTask(team._id).subscribe(
      (response) => {      
        if(result > -1) {
          this.teams.splice(result,1);
          this.dataSource.data = this.teams
          this.showSuccessTopCenter("deleted "+team.name+" successfully")
        }                     //Next callback
        console.log('response received')
      },
      (error) => {                              //Error callback
        console.error('error caught in component')
        this.errorMessage = error;
        this.showError();
  
        //throw error;   //You can also throw the error to a global error handler
      }
    );

  }
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  showError() {
    this.toast.error({detail:"ERROR",summary:this.errorMessage,sticky:true});
    this.toast.error({detail:"ERROR",summary:this.errorMessage,sticky:true, position:'topCenter'});
  }

  showSuccessTopCenter(message:any) {
    this.toast.success({detail:"SUCCESS",summary: message,duration:5000, position:'topCenter'});
  }

  getColor(row:any):string {

    if (row.state === 'Completed'){
      return '#19b43a'
     }

   else if(this.isDueDatePassed(row.dueDate)){
    return '#c21310'
   }
   
   return "";


  }

}


@Component({
  selector: 'app-tasks-dialog',
  templateUrl: 'dialog.html',
})
export class TasksDialog {
  data:Task;
  markedToDelete:number[] = [];
  teamform: FormGroup;
  selected:string = "";  
  teams= [];
  selectedstatus:any;
  status:any;
  currentDate = new Date();
  constructor(private formBuilder: FormBuilder,
    private taskService: TasksService,
    private teamService: TeamService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<TasksDialog>,
    @Inject(MAT_DIALOG_DATA) public actualdata: Task) {
      this.newUser = ''
      this.data = JSON.parse(JSON.stringify(actualdata));
      this.teamform = this.formBuilder.group({
        name: [null, [Validators.required]],
       
        description: [null, [Validators.required]],
        priority: [null, [Validators.required]],
        dueDate:[null,[Validators.required]]
      });

      this.teamService.getTeamNames().subscribe((teams:any) => {
        this.teams = teams;
        this.status = ["Created","In Review","In Progress","Completed"]
        this.selectedstatus = this.data.state
        this.selected = this.data.teamName;
        console.log(teams)
      });
    }
  newUser:any ;
  onNoClick() {
    //this.data = JSON.parse(this.actualdata);
    this.dialogRef.close();

  }





  postdata(){
    //console.log('data added.');
    this.actualdata.description = this.data.description;
    this.actualdata.name = this.data.name;

    this.actualdata.priority = this.data.priority;
    this.actualdata.dueDate = this.data.dueDate;
    this.actualdata.teamName = this.selected;
    this.actualdata.state = this.selectedstatus;
    //this.actualdata.id =10;
    console.log(this.actualdata)

  }

}
