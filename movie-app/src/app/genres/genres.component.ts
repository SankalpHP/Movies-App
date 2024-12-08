import { Component, Input } from '@angular/core';
import { HttpService } from '../services/http.service';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss'
})
export class GenresComponent {
  
  GenresMovies:any = [];
  Genre:string = '';
  pages:any[] = [];
  pageLimit:any[] = [];
  activePage:number = 1;
  onload:boolean = true;
  constructor(private http: HttpService,private activatedRoute:ActivatedRoute){
   
  }

  ngOnInit(){ 
    this.activatedRoute.params.subscribe((params:any) =>{
      this.Genre = params['type'];
      this.getData(1);
    })
  }

  getData(page:any){
    let body = {
      page: page,
      limit:18,
      genre:this.Genre
    }
    this.activePage = page;
    this.http.getMovieGenre(body).subscribe((data:any)=>{
        this.GenresMovies = data;

        if(this.onload){
          for (let index = 0; index < this.GenresMovies.totalPages; index++) {
            this.pages.push(index+1);
        }
      }
      this.onload = false;

      if(this.GenresMovies.currentPage % 6 != 0){
         this.pageLimit = this.pages.slice(this.pages.indexOf(page),this.pages.indexOf(page+6));     
      }else if(this.GenresMovies.currentPage == this.GenresMovies.totalPages){
        this.pageLimit = this.pages.slice(this.GenresMovies.currentPage,this.GenresMovies.totalPages); 
      }
      else if(this.GenresMovies.currentPage % 6 == 0 && this.GenresMovies.currentPage + 1 != this.GenresMovies.totalPages){
        this.pageLimit = this.pages.slice(this.pages.indexOf(page),this.GenresMovies.currentPage + 6);     
      }else{
        this.pageLimit = this.pages.slice(this.pages.indexOf(page),this.GenresMovies.totalPages); 
      }
    });
  }

  getGenres(data:any,genre:string){
   this.GenresMovies = data.filter((item:any)=>{
      return item.Genre.includes(genre);
    })
  }
}
