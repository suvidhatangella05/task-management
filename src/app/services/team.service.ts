import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../teamcomponents/team/team.component';

@Injectable({
  providedIn: 'root'
})


export class TeamService {
  constructor(private httpclient:HttpClient){
  }

  getTeams() {
    return this.httpclient.get("http://localhost:8080/taskmanagement/teams")
  }

  getUsers() {

    return this.httpclient.get("/assets/users.json")
  }

  getTeamNames() {
    return this.httpclient.get("http://localhost:8080/taskmanagement/teamnames")
  }

  addNewTeam(jsonString : string) {
    return this.httpclient.post<Team>('http://localhost:8080/taskmanagement/teams',jsonString); 
    }

    deleteTeam(id:string) {
      return this.httpclient.delete('http://localhost:8080/taskmanagement/teams/'+id);
      }

    updateTeam(id: string,jsonString:string) {
          //request path http://localhost:8080/students/5xbd456xx 
          //first and last names will be send as HTTP body parameters 
         return  this.httpclient.put("http://localhost:8080/taskmanagement/teams/" + 
          id,jsonString);
        }

  getTeamById(id: string) {
          return this.httpclient.get('http://localhost:8080/taskmanagement/teams/'+id);
      }
}
