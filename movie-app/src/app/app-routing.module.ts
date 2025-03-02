import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GenresComponent } from './genres/genres.component';
import { DetailsComponent } from './details/details.component';
import { authGuard } from './guard/auth.guard';
import { FavoritesComponent } from './favorites/favorites.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,pathMatch:'full'},
  {path:"genre/:type",component:GenresComponent,pathMatch:'full'},
  {path:"details/:movie",component:DetailsComponent,pathMatch:'full'},
  {path:"admin",component:AdminComponent,pathMatch:'full',canActivate:[authGuard],data:{roles:["admin"]}},
  {path:"favorites",component:FavoritesComponent,pathMatch:'full',canActivate:[authGuard],data:{roles:["user","admin"]}},
  // universal route
  {path:"**",redirectTo:"home",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
