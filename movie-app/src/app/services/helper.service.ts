import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

   isTokenExpried(token:string){
    const expiry = (JSON.parse(atob(token.split('.')[1])));
    return expiry.exp * 1000 > Date.now();
  }
}
