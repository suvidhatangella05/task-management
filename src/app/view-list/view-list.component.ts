import { Component } from '@angular/core';
import { ListserviceService } from '../listservice.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent{

  lists : any;

  list_name = new FormControl();
  list_desc = new FormControl();
  list_priority = new FormControl();

  Create_list_details = {
    list_name : '',
    list_desc : '',
    list_priority : ''
  }

  options: string[] = ['High', 'Medium', 'low']; 


  constructor(private listservice : ListserviceService){}

  ngOnInit(): void {
    this.getlists();
  }


  getlists() {
    this.listservice.getlist().subscribe(
        //read data and assign to public variable students
        data => { this.lists = data},
        err => console.error(err),
        () => console.log('finished loading')
    );
}

onupdate(listid:string){
  this.listservice.updatelist(listid,this.Create_list_details.list_name , this.Create_list_details.list_desc,this.Create_list_details.list_priority)
  this.listservice.createlist(this.Create_list_details.list_name , this.Create_list_details.list_desc,this.Create_list_details.list_priority)
}

onDelete(listid: string) {
  this.listservice.deletelist(listid);
}

}
