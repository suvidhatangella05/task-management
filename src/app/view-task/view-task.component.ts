import { Component } from '@angular/core';
import { ListserviceService } from '../listservice.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent {

  tasks: any


  taskname = new FormControl();
  taskdesc = new FormControl();
  taskpriority = new FormControl();
  tasksstatus = new FormControl();


  task_details = {
    taskname : '',
    taskdesc : '',
    taskpriority : '',
    tasksstatus : ''
  }

  options: string[] = ['High', 'Medium', 'low']; 
  taskoptions: string[] = ['completed', 'not completed']; 



  constructor(private listservice : ListserviceService){}

  ngOnInit(): void {
    this.getlists();
  }


  getlists() {
    this.listservice.gettasks().subscribe(
        //read data and assign to public variable students
        data => { this.tasks = data},
        err => console.error(err),
        () => console.log('finished loading')
    );
}

createList(){

  this.listservice.createtask(this.task_details.taskname , this.task_details.taskdesc,this.task_details.taskpriority, this.task_details.tasksstatus)
  
}

onupdate(listid:string){
  this.listservice.updatetask(listid,this.task_details.taskname , this.task_details.taskdesc,this.task_details.taskpriority, this.task_details.tasksstatus)
  // this.listservice.createlist(this.task_details.taskname , this.task_details.taskdesc,this.task_details.taskpriority, this.task_details.tasksstatus)
}

onDelete(listid: string) {
  this.listservice.deletetask(listid);
}

}
