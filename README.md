# 🎬 Movie Project
 *This is a movie application built with Angular for the frontend and a Node.js Express server for the backend, using MongoDB as the database. The application allows users to view movies, search for movies, filter movies by genre, and view detailed information for each movie, including trailers, actor details, and ratings. Users can log in, sign up, add comments, add movies to favorites, and remove movies from favorites. There are two types of login: user and admin.*
# 🚀 Live Demo
 *You can check out the live demo of the project here:*👉 [Movie Project Demo](http://65.1.106.176/home).
## ✨ Features 
 + **🎞️ View All Movies:** Displays a list of all available movies.
 + **🎯 Filter by Genre:** View movies belonging to a specific genre.
 + **🔍 Search Movies:** Search movies by their name or keyword.
 + **📄 Movie Details:** See detailed information for a selected movie, including:
   + Name
   + Genre
   + Trailer
   + Actors
   + Ratings
   + Awards
 + **🔐 Login:** Login as user to access the extra features.
 + **🔐 Signup:** Signup as user.
 + **❤️ Favorites:** user can add their favorite movie.
 + **Remove Movie from Favorite**  user can remove their favorite movie.
 + **💬 Comments:** user can comment on movies they like and admin can remove the comments.
## 🧰 Tech Stack
 ### 🖥️ Frontend
 + Framework: Angular 18.
 + Styling: Bootstrap,HTML,CSS,jquery.
 + Language: Javascript,TypeScript.
 ### ⚙️ Backend
 + Framework: Express js (RESTful API).
 + Server: Node.js.
 ### Database:
   + NOSQL: Mongodb.
 ## 🛠️ Installation & Setup
 ### ✅ Prerequisites
   + Node.js installed on your machine.
   + Angular CLI installed globally.
   + Mongodb installed on your machine.
   + Mongodb compass on your machine.
 ## 📦 Steps to Run the Application
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
    npm start
    ```
 4. Start the Angular frontend:
    ```bash
    ng serve
    ```
 5. Open the application in your browser:
    ```bash
    http://localhost:4200
    ```
## 🗂️ Folder Structure
  ### 📁 Frontend (Angular)
  + **src/app:** Contains all the Angular components, services, and modules.
     + **app/:** Components for genres,details,home,services,favorite,admin and route guard.
     + **app/common-component:** Components for navbar,footer.
     + **app/assets/Images:** Contains all the static images.
  ### 📁 Backend (Node.js)
  + **app.js:** Main entry point for the express server. Contains logic to start the server and middle requests.
  + **Controller:** Contains Business Logic.
  + **dbConfig:** Contains database connection config.
  + **model:** Contains database opertions logic.
  + **route:** route middle Contains mapping of http methods, url paths.
  + **package.json** and **package-lock.json:** Files managing the server's dependencies and scripts.
## 📡 API Endpoints:
  ### Fetch All Movies
  ```bash
   POST /movies/getallmovies
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
  ### Add Movies to favorite
  ```bash 
   POST /fav/addfav
  ```
  ### Fetch favorite movies
  ```bash 
   POST /fav/getfav 
  ```
  ### Remove favorite movies
  ```bash 
   POST /fav/removie 
  ```
  ### Add comments to movie
  ```bash 
   POST /comment/addcomment
  ```
  ### Fetch comments on specfic movies
  ```bash 
   /comment/getcomments
  ```
  ### Fetch comments all with movies (Admin Only)
  ```bash 
   /comment/getallcomments
  ```
  ### Remove comments on specific movies (Admin Only)
  ```bash 
   POST /comment/removecomments
  ```
  ### Signup user
  ```bash 
   POST /user/saveUser
  ```
  ### Login user
  ```bash 
   POST /user/getUser
  ```
## 👨‍💻 Author
  *Sankalp Selokar*
  *Feel free to connect with me at 📧 selokarsankalp@gmail.com*.
