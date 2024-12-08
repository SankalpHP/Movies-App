import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GenresComponent } from './genres/genres.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,pathMatch:'full'},
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"genre/:type",component:GenresComponent,pathMatch:'full'},
  {path:"details/:movie",component:DetailsComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
