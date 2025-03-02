import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
   url = "http://localhost:3000";
  //url = "http://65.1.106.176:3000";
  constructor(private http:HttpClient,private router:Router) { }

  getMovies(body:any):Observable<any>{
    return this.http.post(`${this.url}/movies/getallmovies`,body);
  }

  movieSearch(body:any):Observable<any>{
    return this.http.post(`${this.url}/movies/search`,body);
  }

  getMovie(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/movies/movie`,body);
  }

  getMovieGenre(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/movies/genre`,body);
  }

  getComments(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/comment/getcomments`,body);
  }

  getAllComments():Observable<any>{
     return this.http.post<any>(`${this.url}/comment/getallcomments`,null);
  }

  removeComment(body:any):Observable<any>{
     return this.http.post<any>(`${this.url}/comment/removecomments`,body);
  }

  addComments(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/comment/addcomment`,body);
  }

  saveUser(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/user/saveUser`,body);
  }

  getUser(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/user/getUser`,body);
  }

  saveFavMovie(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/fav/addfav`,body);
  }

  getFavMovie(body:any):Observable<any>{
    return this.http.post<any>(`${this.url}/fav/getfav`,body);
  }

  removeFavMovie(body:any):Observable<any>{
    return this.http.post(`${this.url}/fav/removie`,body);
  }
}
