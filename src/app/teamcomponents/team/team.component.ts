import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeamService } from 'src/app/services/team.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import {MatButtonModule} from '@angular/material/button';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { NgToastService } from 'ng-angular-popup';
import { ListserviceService } from 'src/app/listservice.service';

export interface Team {
  name: string;
  email: string;
  description: string;
  _id: string,
  users:string [],
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'description', 'users','Action'];
  dataSource:any = new MatTableDataSource()
  team:any;
  teams: Team[] = [];
  errorMessage:any;

  constructor(
    private toast: NgToastService,
    private teamService: TeamService,
    public dialog: MatDialog,
    private listservice : ListserviceService
  ) {


  }
  ngOnInit() {
    this.teamService.getTeams()
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

  addItem() {
    
    let team:Team = {
      name: '',
      email: '',
      description: '',
      _id: "",
      users: []
    }
    
    const dialogRef = this.dialog.open(TeamsDialog, {
      width: '1000px',
      height: '500px',
      data: team
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if(team.name !== "") {
      this.team = team;
      //team._id = "10";
    
      this.teamService.addNewTeam(this.team).subscribe(
        
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
  
  

  editteam(team:Team) {
    const dialogRef = this.dialog.open(TeamsDialog, {
      width: '1000px',height:'700px',
      data: team
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.team = team;
      this.dataSource.data = this.teams
      console.log("updating data \n"+team)
      this.teamService.updateTeam(this.team._id,this.team).subscribe(
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

  deleteteam(team:Team) {
    let result = this.teams.findIndex((element,index) =>{
    return  element._id == team._id;
    })
    this.teamService.deleteTeam(team._id).subscribe(
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

  showError() {
    this.toast.error({detail:"ERROR",summary:this.errorMessage,sticky:true});
    this.toast.error({detail:"ERROR",summary:this.errorMessage,sticky:true, position:'topCenter'});
  }

  showSuccessTopCenter(message:any) {
    this.toast.success({detail:"SUCCESS",summary: message,duration:5000, position:'topCenter'});
  }

}


@Component({
  selector: 'app-teams-dialog',
  templateUrl: 'dialog.html',
})
export class TeamsDialog {
  data:Team;
  markedToDelete:number[] = [];
  teamform: FormGroup;
  selected:string[] = []; 
  users :any[]=[]
  constructor(private formBuilder: FormBuilder,
    private teamService: TeamService,private listservice :ListserviceService,

    public dialogRef: MatDialogRef<TeamsDialog>,
    @Inject(MAT_DIALOG_DATA) public actualdata: Team) {
      this.newUser = ''
      this.data = JSON.parse(JSON.stringify(actualdata));
      this.teamform = this.formBuilder.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
      });
      this.listservice.getusers().subscribe((teams) => {
        // Initialize an empty array to store Usernames
        const usernames: string[] = [];
    
        // Iterate over the values of the object
        Object.values(teams).forEach(user => {
            // Push the UserName to the array
            usernames.push(user.UserName);
        });
        
        this.users = usernames       
        this.selected = this.data.users;
        console.log(this.users)

        
      });
    }
  newUser:any ;
  onNoClick() {
    //this.data = JSON.parse(this.actualdata);
    this.dialogRef.close();

  }
  addUserToTeam(){
    if(this.newUser!= null && this.newUser != '') {
    this.data.users.push(this.newUser);
    }
  }
  deleteUserFromTeam(index:number){
    console.log('Checkbox was unchecked.',index);
    //this.markedToDelete.push(index);
    this.data.users.splice(index,1);
  }

  onCheckboxChange(event: any,index:number) {
    if (!event.checked) {
      console.log('Checkbox was unchecked.');
      this.data.users.splice(index,1);
      // Add your logic here.
    }
  }
  postdata(){
    //console.log('data added.');
    this.actualdata.description = this.data.description;
    this.actualdata.name = this.data.name;

    this.actualdata.email = this.data.email;

    this.actualdata.users = this.selected;
   
    //this.actualdata.id =10;
    console.log(this.actualdata)

  }

}
