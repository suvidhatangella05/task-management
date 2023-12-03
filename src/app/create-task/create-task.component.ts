import { Component } from '@angular/core';
import { NavListService } from '../nav-list.service';
import { FormControl } from '@angular/forms';
import { ListserviceService } from '../listservice.service';



@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {


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

  lists :any
  newItem: { listName: string, selectedOption: string } = { listName: '', selectedOption: '' };
  items: { listName: string, selectedOption: string }[] = [];
  options: string[] = ['High', 'Medium', 'low']; 

  taskoptions: string[] = ['completed', 'not completed']; 


  constructor(private navListService: NavListService,private listservice : ListserviceService ) {
  }

  createList(){

    this.listservice.createtask(this.task_details.taskname , this.task_details.taskdesc,this.task_details.taskpriority, this.task_details.tasksstatus)
    
  }

  

}
