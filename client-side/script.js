let moviesImage = document.getElementById("cover-image");
let movieTitle = document.getElementById("movie-title");
let movieDescription = document.getElementById("movie-description");
let movieActions = document.getElementsByClassName("movie-actions");
let releaseDate = document.getElementById("release");
let peopleVoted = document.getElementById("voted");

fetch("http://localhost:5000/movies/", {
  method: "GET",
})
  .then((res) => res.json())
  .then((movieList) => {
    //dynamically add data to movie card in html for each movie
    console.log(movieList);
    movieList.results.map((movie) => {
      moviesImage.src = `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`;
      movieTitle.innerText = movie.original_title;
      releaseDate.innerText = movie.release_date;
      peopleVoted.innerText = movie.vote_count;
    });

    for (let i = 0; i < movieList.results.length; i++) {
      return (moviesImage.src = `https://www.themoviedb.org/t/p/w220_and_h330_face${movieList.results[i].poster_path}`);
    }
  })
  .catch((err) => console.error(err));
