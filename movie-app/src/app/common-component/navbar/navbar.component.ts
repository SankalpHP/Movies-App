import { Component, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any; // Declare jQuery globally

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  Genre = ["Drama","Crime","Action","Biography","History","Adventure",
            "Western","Romance","Sci-Fi","Fantasy","Mystery","Family",
            "Thriller","War","Comedy","Animation","Music","Horror",
            "Film-Noir","Sport"
          ] 

  formData:FormGroup;        
  searchMovies:any;
  constructor(private http:HttpService,private fb:FormBuilder){
      this.formData = this.fb.group({
        title:["",Validators.required]
      });
  }       
          
    getMovie(title:FormGroup){
      let body = {
                    title:title.value.title
                 };
      this.http.movieSearch(body).subscribe((data:any)=>{
          this.searchMovies = data;
           $('#Results-Modal').modal('show');
      });
    }

    reload(){
      location.reload;
    }
}
