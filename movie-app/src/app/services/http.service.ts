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
  constructor(private http:HttpClient,private router:Router) { }

  getMovies(body:any):Observable<any>{
    return this.http.post(`${this.url}/movies`,body);
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
}
