import { Component } from '@angular/core';
import { NavListService } from '../nav-list.service';
import { FormControl } from '@angular/forms';
import { ListserviceService } from '../listservice.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent {

  list_name = new FormControl();
  list_desc = new FormControl();
  list_priority = new FormControl();

  Create_list_details = {
    list_name : '',
    list_desc : '',
    list_priority : ''
  }

  lists :any





  newItem: { listName: string, selectedOption: string } = { listName: '', selectedOption: '' };
  items: { listName: string, selectedOption: string }[] = [];
  options: string[] = ['High', 'Medium', 'low']; 




  constructor(private navListService: NavListService, private listservice : ListserviceService) {
    this.items = this.navListService.getItems();
  }

  addItem() {
    this.items.push({ listName: '', selectedOption: '' });
  }

  createList() {
    // if (this.newItem.listName.trim() !== '' && this.newItem.selectedOption.trim() !== '') {
    //   this.items.push({ listName: this.newItem.listName, selectedOption: this.newItem.selectedOption });
    //   this.newItem = { listName: '', selectedOption: '' };
    // }
    // alert("List Created Successfully")

    console.log(this.Create_list_details.list_name , this.Create_list_details.list_desc,this.Create_list_details.list_priority)
    this.listservice.createlist(this.Create_list_details.list_name , this.Create_list_details.list_desc,this.Create_list_details.list_priority)
  }

  removeItem(index: number) {
    // Remove the item from 'items'
    this.items.splice(index, 1);
  }


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

onchange(listname:any){
  alert(listname)
}
}
