import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../teamcomponents/tasks/tasks.component';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private httpclient: HttpClient) {
  }

  getTasks() {
    return this.httpclient.get("http://localhost:8080/taskmanagement/teamtasks")
  }

  getUsers() {

    return this.httpclient.get("/assets/users.json")
  }



  addNewTask(jsonString: string) {
    return this.httpclient.post<Task>('http://localhost:8080/taskmanagement/teamtasks', jsonString);
  }

  deleteTask(id: string) {
    return this.httpclient.delete('http://localhost:8080/taskmanagement/teamtasks/' + id);
  }

  updateTask(id: string, jsonString: string) {
    //request path http://localhost:8080/students/5xbd456xx 
    //first and last names will be send as HTTP body parameters 
    return this.httpclient.put("http://localhost:8080/taskmanagement/teamtasks/" +
      id, jsonString);
  }

  getTaskById(id: string) {
    return this.httpclient.get('http://localhost:8080/taskmanagement/teamtasks/' + id);
  }
}

