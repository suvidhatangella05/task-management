import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateListComponent } from './create-list/create-list.component';
import { ViewListComponent } from './view-list/view-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { TeamComponent } from './teamcomponents/team/team.component';
import { TasksComponent }from './teamcomponents/tasks/tasks.component'
const routes: Routes = [
  {path:'create-list',component : CreateListComponent},
  {path : 'view-list',component: ViewListComponent},
  {path: 'create-user',component: CreateUserComponent},
  {path : 'view-user',component: ViewUserComponent},
  {path : 'create-task',component: CreateTaskComponent},
  {path : 'view-task',component: ViewTaskComponent},
  {path : 'team', component : TeamComponent },
  {path:'team-task',component : TasksComponent}
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
