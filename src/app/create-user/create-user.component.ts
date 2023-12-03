import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListserviceService } from '../listservice.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {


  UserName = new FormControl();
  Email = new FormControl();
  Password = new FormControl();
  confirmpassword = new FormControl();

  Userdetails = {
    UserName : '',
    Email : ''
  }

  users :any

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
}
