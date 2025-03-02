import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../services/helper.service';

declare var $:any; // declare the jquery

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent {
  
  safetrailerUrl: SafeResourceUrl | undefined;
  movie:any;
  title:any;
  comments:FormGroup;
  usercomments:any;
  message:any;
  constructor(private route:ActivatedRoute, private sanitizer: DomSanitizer,private http:HttpService,private fb:FormBuilder,private helper:HelperService){
      this.comments = this.fb.group({
        moviecomment:['',[Validators.required]]
      });
  }

  ngOnInit(){
    this.route.params.subscribe((params:any) => {
       this.getMovie(params['movie']);
       this.getUserComment(params['movie']);
       this.title = params['movie']
    });
  }

  getMovie(title:any){
    let body = {
      title:title
    }
    this.http.getMovie(body).subscribe((data:any)=>{
      this.movie = data;
      if (this.movie?.trailer) {
        const embedUrl = this.getEmbedUrl(this.movie.trailer);
        this.safetrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      }
    })
  }

  // Convert YouTube video URL to embed URL
  getEmbedUrl(url: string): string {
    const videoId = this.extractVideoId(url);
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  }

  // Extract video ID from a standard YouTube URL
  extractVideoId(url: string): string {
    const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/)([^&?]+)/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  // comments form data
  userComment(){
    if(this.comments.valid){
      // console.log(this.comments.value.moviecomment);

        const token = localStorage.getItem('token');
        // checks token is present or not
        if(token){
           // Check if the jwt token is valid or expiry
          if (this.helper.isTokenExpried(token)) {
              // Decode JWT payload (assuming it's base64 encoded)
              const payload = JSON.parse(atob(token.split('.')[1]))

              console.log(payload);
            
              let body = {
                movie:this.title,
                comment:this.comments.value.moviecomment,
                username:payload.name,
                id:payload.id
              }
              this.http.addComments(body).subscribe((data:any)=>{
                // if user comment added successfully!
                if (data.message == "comment added successfully!") {
                  // set the message
                  this.message = data.message;
                  // show the message
                  $('#CommentModalLabel').modal('show');
                  // getting user comments again
                    this.getUserComment(this.title);
                }
              });
          } else {
              // set the message
              this.message = "Timeup Token is expiry! Please login again"
              // jwt token is null then show the message
              $('#CommentModalLabel').modal('show');

              // remove the token 
              localStorage.removeItem('token');
              
              // reload 
              setTimeout(() => {
                location.reload();  
              }, 2000);
          }
      }else{
        // set the message
        this.message = "Login required"
        // jwt token is null then show the message
        $('#CommentModalLabel').modal('show');
      }
    }
  }
  
  // get all user comments
  getUserComment(title:any){
    let body = {
       title : title
    }
    this.http.getComments(body).subscribe((data:any)=>{
       if(data.length){
        this.usercomments = data;
        // console.log(this.usercomments);
       }
    });
  }

  // add favorite Movie
  addFavMovie(){
    const token = localStorage.getItem('token');
    // if jwt token is present
    if(token){
        // Check if the jwt token is valid or expiry
        if (this.helper.isTokenExpried(token)) {
          // Decode JWT payload (assuming it's base64 encoded)
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log(payload);
          
            let body = {
              title : this.movie.Title,
              poster: this.movie.Poster,
              username: payload.name,
              userId: payload.id
            }
            this.http.saveFavMovie(body).subscribe((data:any)=>{
              console.log(data);
              // set the message
              this.message = data.message;
              // show the message
              $('#CommentModalLabel').modal('show');
          })
        } else {
          // set the message
          this.message = "Timeup Token is expiry! Please login again"
          // jwt token is null then show the message
          $('#CommentModalLabel').modal('show');

          // remove the token 
          localStorage.removeItem('token');
          
          // reload 
          setTimeout(() => {
            location.reload();  
          }, 2000);
        }
    }else{
       // set the message
       this.message = "Login required"
       // jwt token is null then show the message
       $('#CommentModalLabel').modal('show');
    }
  }
}
