import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  
  safetrailerUrl: SafeResourceUrl | undefined;
  movie:any;
  constructor(private route:ActivatedRoute, private sanitizer: DomSanitizer,private http:HttpService){}

  ngOnInit(){
    this.route.params.subscribe((params:any) => {
       this.getMovie(params['movie'])
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
}
