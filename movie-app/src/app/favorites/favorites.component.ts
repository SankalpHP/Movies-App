import { Component, inject, PLATFORM_ID } from '@angular/core';
import { HttpService } from '../services/http.service';
import { HelperService } from '../services/helper.service';

declare var $:any; // declare the jquery

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  // Inject dependencies
  platformId = inject(PLATFORM_ID);
  
  favMovies:any;
  message:any;
  constructor(private http:HttpService,private helper:HelperService){}

  ngOnInit(){
    this.getfavMovie();
  }
 
  // get fav movie list
  getfavMovie(){
    if(this.platformId == "browser"){
      // get jwt token from browser localStorage
      const token:any = localStorage.getItem('token');

      if(token){
         // Check if the jwt token is valid or expiry
         if (this.helper.isTokenExpried(token)) {
           // Decode JWT payload (assuming it's base64 encoded)
            const payload = JSON.parse(atob(token.split(".")[1]))
            console.log(token);
          
            let body = {
              userId:payload.id
            }
            this.http.getFavMovie(body).subscribe((data:any)=>{
              this.favMovies = data.getmovie;
            });
         } else {
            // set message
            this.message = "Timeup Token is expiry! Please login again";
            // open up the message modal
            $('#messageModal').modal('show');

             // remove the token
             localStorage.removeItem('token')

            // reload
            setTimeout(() => {
              location.reload();
            }, 2000);
         }
      }
    }
  }

  // remove fav movie
  removefavMovie(title:any){
   // get jwt token from browser localStorage
   const token:any = localStorage.getItem('token');

   if(token){
     // Check if the jwt token is valid or expiry
     if (this.helper.isTokenExpried(token)) {
        // Decode JWT payload (assuming it's base64 encoded)
        const payload = JSON.parse(atob(token.split(".")[1]))

        let body = {
          id:payload.id,
          title:title
        }
        // remove the fav movie http
        this.http.removeFavMovie(body).subscribe((data:any)=>{
              console.log(data);
              if(data.message == "movie remove from your favorite!"){
                // again call the movie's
                this.getfavMovie();
              }
        });
     }else{
        // set message
        this.message = "Timeup Token is expiry! Please login again";
        // open up the message modal
        $('#messageModal').modal('show');

        // remove the token
        localStorage.removeItem('token')

        // reload
        setTimeout(() => {
          location.reload();
        }, 2000);
     }
   }
  }
}
