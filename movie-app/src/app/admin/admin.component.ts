import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { HelperService } from '../services/helper.service';

declare var $: any; // Declare jQuery globally

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
   comments:any;
   message:any;
   constructor(private http:HttpService,private helper:HelperService){}

   ngOnInit(){
    this.getComments();
   }
   
  //  get All comments
   getComments(){
      this.http.getAllComments().subscribe((data:any)=>{
         this.comments = data;
      });
   }

  // remove the comment
  removeComments(detail:any){

   const token = localStorage.getItem('token');
   if (token) {
      if (this.helper.isTokenExpried(token)) {
         let body = {
            id:detail._id
         }
         this.http.removeComment(body).subscribe((data:any)=>{
           if (data.message == "comment deleted successfully!") {
              //  get All comments
               this.getComments(); 
           }
         });
      }else{

         // set the msg
         this.message = "Timeup Token is expiry! Please login again"

         // show the msg 
         $('#messageModal').modal('show');
   
         // remove the token from local storage
         localStorage.removeItem('token');
   
         // reload
         setTimeout(() => {
            location.reload();
         }, 2000);
      }
   }
  }
}
