import { FormControl } from '@angular/forms';
import { ListserviceService } from '../listservice.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  users : any;

  UserName = new FormControl();
  Email = new FormControl();
  Password = new FormControl();
  confirmpassword = new FormControl();

  Userdetails = {
    UserName : '',
    Email : ''
  }


  constructor(private listservice : ListserviceService) {
  }

  ngOnInit(): void {
    this.getusers();
  }


  getusers() {
    this.listservice.getusers().subscribe(
        //read data and assign to public variable students
        data => { this.users = data},
        err => console.error(err),
        () => console.log('finished loading')
    );
}


  createuser(){
    console.log(this.Userdetails.UserName, this.Userdetails.Email)
      this.listservice.createuser(this.Userdetails.UserName , this.Userdetails.Email)
  }

  onupdate(listid:string){
    this.listservice.updateuser(listid,this.Userdetails.UserName, this.Userdetails.Email)
  }
  
  onDelete(listid: string) {
    this.listservice.deleteuser(listid);
  }


}
