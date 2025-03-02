import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HelperService } from '../services/helper.service';

export const authGuard: CanActivateFn = (route, state) => {

  // console.log(route);

  // Inject dependencies
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const helper = inject(HelperService)

  // check if angular universe running in the server
  if(platformId == 'server'){
    router.navigate(['/home'])
    return false;
  }else{
      // Extract required roles from route's data
      const requiredRoles = route.data?.['roles'] as Array<string>;
      console.log(requiredRoles[2]);
      
    
      // Retrieve token from localStorage (or use a token service)
      const token:any = localStorage.getItem('token');
      
      // if token is not present
      if(!token){
        // Redirect to login if no token is found
        router.navigate(['/home']);
        return false;
      }
      // check the token expiry's or not
      if(helper.isTokenExpried(token)){
            // Decode JWT payload (assuming it's base64 encoded)
              const payload = JSON.parse(atob(token.split('.')[1]));
              console.log("payload => ", payload);
              
              const userRole  = payload.role; // Assuming the JWT contains a 'role' field
              console.log("userRole => ", userRole);

              // check if the user's role matches any of the required roles
              if(requiredRoles.includes(userRole[0])){
                return true; // allow acces
              }else if(requiredRoles.includes(userRole[1])){
                return true;
              }else {
                // Redirect to home page if the role doesn't match
                router.navigate(['/home']);
                return false;
              }
      }else{
        return false;
      }
  }
};
