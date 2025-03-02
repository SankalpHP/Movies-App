# Movie Project
 *A movie application built with Angular for the frontend and a Node.js fake JSON server as the backend. This application allows users to view movies, search movies, filter movies by genre, and see detailed information for each movie, including trailers, actor details, and ratings.*
# Project Demo
 *You can check out the live demo of the project here:*[Movie Project Demo](http://65.1.106.176/home)
## Features 
 + **View All Movies:** Displays a list of all available movies.
 + **Filter by Genre:** View movies belonging to a specific genre.
 + **Search Movies:** Search movies by their name or keyword.
 + **Movie Details:** See detailed information for a selected movie, including:
   + Name
   + Genre
   + Trailer
   + Actors
   + Ratings
   + Awards
## Tech Stack
 ### Frontend
 + Framework: Angular 18
 + Styling: Bootstrap,HTML,CSS
 + language: Javascript,TypeScript
 ### Backend
 + Server: Node.js (Fake JSON server)
 + APIs:
    +  ```POST /movies``` Fetch all movies.
    +  ```POST /movies/genre``` Fetch movies by genre.
    +  ```POST /movies/movie``` Fetch a particular movie's details.
    +  ```POST /movies/search``` Search for movies.
 ## Installation and Setup
 ### Prerequisites
   + Node.js installed on your machine
   + Angular CLI installed globally
 ## Steps to Run the Application
 1. Clone the repository:
    ```bash
    git clone  https://github.com/SankalpHP/Movies-App.git cd your-repo
    ```
 2. Install dependencies:
    ```bash
    npm install
    ```    
 3. Start the backend server:
    ```bash
    nodemon index.js
    ```
 4. Start the Angular frontend:
    ```bash
    ng serve
    ```
 5. Open the application in your browser:
    ```bash
    http://localhost:4200
    ```
## Folder Structure
  ### Frontend (Angular)
  + **src/app:** Contains all the Angular components, services, and modules.
     + **app/:** Components for genres,details,home,services.
     + **app/common-component:** Components for navbar,footer.
     + **app/assets/Images:** Contains all the static images.
  ### Backend (node.js)    
  + **index.js:** Main entry point for the fake server. Contains logic to start the server and handle requests.
  + **movies.json:** JSON file containing mock data for movies.
  + **package.json** and **package-lock.json:** Files managing the server's dependencies and scripts.
## API Endpoints
  ### Fetch All Movies
  ```bash
   POST /movies
  ```
  ### Fetch Movie by ID
  ```bash
   POST /movies/movie
  ```
  ### Fetch Movies by Genre
  ```bash
   POST /movies/genre
  ```
  ### Search Movies
  ```bash
   POST /movies/search
  ```
## Author
  *Sankalp Selokar*
  *Feel free to connect with me at selokarsankalp@gmail.com*.
