import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../../services/helper.service';

declare var $: any; // Declare jQuery globally

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  loginForm:any = true;
  signupForm:any = false;
  loginmsg:any;
  username:any;
  isAdmin:boolean = false;

  Genre = ["Drama","Crime","Action","Biography","History","Adventure",
            "Western","Romance","Sci-Fi","Fantasy","Mystery","Family",
            "Thriller","War","Comedy","Animation","Music","Horror",
            "Film-Noir","Sport"
          ] 

  formData:FormGroup;        
  searchMovies:any;

  userLogin:FormGroup;
  userSignup:FormGroup;
  
  // Inject dependencies
  platformId = inject(PLATFORM_ID);

  constructor(private http:HttpService,private fb:FormBuilder,private helper:HelperService){
      this.formData = this.fb.group({
        title:["",Validators.required]
      });
      
      // Login Form
      this.userLogin = this.fb.group({
        email:["",[Validators.required,Validators.email]],
        password:["",[Validators.required]]
      });
      
      // Signup Form
      this.userSignup = this.fb.group({
        user:["",[Validators.required]],
        email:["",[Validators.required,Validators.email]],
        password:["",[Validators.required]]
      });
  }

  ngOnInit(){
     this.checkToken();
  }

    checkToken(){
       // Check if angular universe running in the server or in browser
      if(this.platformId == 'browser'){
        // getting token from the localstorage of the browser
        const token:any = localStorage.getItem('token');
        
        // checks token is present or not
        if(token){
          // Check if the jwt token is valid or expiry
          if (this.helper.isTokenExpried(token)) {
              if(token){
                // Decode JWT payload (assuming it's base64 encoded)
                  const payload = JSON.parse(atob(token.split('.')[1]))
                  // console.log(payload);
                  this.username = payload.name;

                  if(payload.role[1] == "admin"){
                    this.isAdmin = true;
                  }
              }
          }else{
              // remove the expiry token
              localStorage.removeItem('token');
              // set the message 
              this.loginmsg = "Timeup Token is expiry! Please login again"
              // show the message box
              $('#LoginMessageModalLabel').modal('show')
          }
        }
      }
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

    // hide/show form
    isdisplay(type:any){
       if(type == "login"){
        this.loginForm= true;
        this.signupForm = false;
       }else{
        this.loginForm = false;
        this.signupForm = true;  
       }
    }


    // login & register
    login(){

      if (this.userLogin.valid) {
        // console.log(this.userLogin.value);
        
        let body = {
           email:this.userLogin.value.email,
           password:this.userLogin.value.password
        }
        try {
          this.http.getUser(body).subscribe((data:any)=>{
            //  console.log(data);
             if(data.user.message == "Login successfully!"){

              // set the msg to msg modal
                this.loginmsg = data.user.message;

              // close the login modal
                $('#LoginModal').modal('hide')

              // open the msg modal  
                $('#LoginMessageModalLabel').modal('show');
              
              // setting token to localstorage of browser  
              localStorage.setItem("token",data.user.token); 
              
              this.username = data.user.userName;
              
              // setting admin button visiable
              const payload = JSON.parse(atob(data.user.token.split('.')[1]))
              if(payload.role[1] == "admin"){
                this.isAdmin = true;
              }

             }else if(data.user.message == "Invalid Credentials" || data.user.message == "User not found"){
                this.loginmsg = data.user.message;
                $('#LoginMessageModalLabel').modal('show');
             }
          });
        } catch (error) {
          throw(error)
        }
      }
    }
    
    // user sign up
    signup(){

      if (this.userSignup.valid) {
        // console.log(this.userSignup.value.user);
        let body = {
            username:this.userSignup.value.user,
            email:this.userSignup.value.email,
            password:this.userSignup.value.password
        };
        try {
          this.http.saveUser(body).subscribe((data:any)=>{
              if (data.msg = "Register successfully!") {
                // set the msg to msg modal
                  this.loginmsg = data.msg;
                // open the msg modal  
                 $('#LoginMessageModalLabel').modal('show');  
              }
          });
        } catch (error) {
          throw(error)
        }
      }
    }

    // logout
    logout(){
      // remove jwt token from browser localstorage
      localStorage.removeItem('token');
      // set the msg to msg modal
      this.loginmsg = "Logout successfully!";
      // open the msg modal  
      $('#LoginMessageModalLabel').modal('show'); 
      
      // After 2 sec the page will reload
      setInterval(()=>{
        location.reload();
      },2000);
    }
}