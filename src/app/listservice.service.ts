import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ListserviceService {

  constructor(private http: HttpClient ) { }

  createlist(list_name : string , list_desc : string , list_priority : string) {
    this.http.post('http://localhost:8080/lists',{ list_name, list_desc, list_priority })
        .subscribe((responseData) => {
            console.log(responseData);
        }); 
        location.reload();
    }

    createuser(UserName : string , Email : string) {
      this.http.post('http://localhost:8080/users',{ UserName, Email })
          .subscribe((responseData) => {
              console.log(responseData);
          }); 
          location.reload();

      }

      createtask(taskname : string , taskdesc : string,taskpriority : string ,tasksstatus : string ) {
        this.http.post('http://localhost:8080/tasks',{ taskname, taskdesc, taskpriority,tasksstatus})
            .subscribe((responseData) => {
                console.log(responseData);
            }); 
            location.reload();

        }

      getusers() {
        return this.http.get('http://localhost:8080/users/');
      }

    getlist() {
      return this.http.get('http://localhost:8080/lists/');
    }


    gettasks() {
      return this.http.get('http://localhost:8080/tasks/');
    }

    deletelist(listid: string) {
      this.http.delete("http://localhost:8080/lists/" + listid)
          .subscribe(() => {
              console.log('Deleted: ' + listid);
          });
      location.reload();
    }

    updatelist(listid: string,list_name : string , list_desc : string , list_priority : string) {
      this.http.put("http://localhost:8080/lists/" + 
      listid,{ list_name, list_desc, list_priority })
      .subscribe(() => {
          console.log('Updated: ' + listid);
      });
      location.reload();

    }

    updatetask(listid: string,taskname : string , taskdesc : string , taskpriority : string, tasksstatus : string) {
      this.http.put("http://localhost:8080/tasks/" + 
      listid,{ taskname, taskdesc, taskpriority,tasksstatus })
      .subscribe(() => {
          console.log('Updated: ' + listid);
      });
      location.reload();

    }

    updateuser(listid: string,UserName : string, Email : string) {
      this.http.put("http://localhost:8080/users/" + 
      listid,{ UserName, Email })
      .subscribe(() => {
          console.log('Updated: ' + listid);
      });
      location.reload();

    }

    deleteuser(listid: string) {
      this.http.delete("http://localhost:8080/users/" + listid)
          .subscribe(() => {
              console.log('Deleted: ' + listid);
          });
      location.reload();
    }

    deletetask(listid: string) {
      this.http.delete("http://localhost:8080/tasks/" + listid)
          .subscribe(() => {
              console.log('Deleted: ' + listid);
          });
      location.reload();
    }


}
