import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title:string = '';
  allMovies:any;
  pages:any[] = [];
  pageLimit:any[] = [];
  activePage:number = 1;
  onload:boolean = true;
  constructor(private http:HttpService){}

  ngOnInit(){
    this.getdata(1);
  }

  getdata(page:any){
    let body = {
      page: page,
      limit:18
    }
    this.activePage = page;
    this.http.getMovies(body).subscribe((data:any) => { 
      this.allMovies = data;
    
    if(this.onload){
          for (let index = 0; index < this.allMovies.totalPages; index++) {
            this.pages.push(index+1);
        }
      }
      this.onload = false;

      if(this.allMovies.currentPage % 6 != 0){
         this.pageLimit = this.pages.slice(this.pages.indexOf(page),this.pages.indexOf(page+6));     
      }else if(this.allMovies.currentPage == this.allMovies.totalPages){
        this.pageLimit = this.pages.slice(this.allMovies.currentPage,this.allMovies.totalPages); 
      }
      else if(this.allMovies.currentPage % 6 == 0 && this.allMovies.currentPage + 1 != this.allMovies.totalPages){
        this.pageLimit = this.pages.slice(this.pages.indexOf(page),this.allMovies.currentPage + 6);     
      }else{
        this.pageLimit = this.pages.slice(this.pages.indexOf(page),this.allMovies.totalPages); 
      }
    })
  }
}
