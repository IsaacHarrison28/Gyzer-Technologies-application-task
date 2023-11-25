let movieListContainer = document.getElementById("movies-cards-container");

function getMoviesList() {
  fetch("http://localhost:5000/movies/", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((movieList) => {
      //dynamically add data to movie card in html for each movie
      for (let i = 0; i < movieList.results.length; i++) {
        //card container
        let movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        //cover image
        let imageContainer = document.createElement("div");
        imageContainer.classList.add("movie-image-container");
        let coverImage = document.createElement("img");
        coverImage.src = `https://www.themoviedb.org/t/p/w220_and_h330_face${movieList.results[i].poster_path}`;
        coverImage.title = movieList.results[i].original_title;
        coverImage.alt = movieList.results[i].original_title;
        imageContainer.append(coverImage);
        //title
        let title = document.createElement("div");
        title.classList.add("movie-title");
        let titleText = document.createElement("p");
        titleText.id = "movie-title";
        titleText.innerText = movieList.results[i].original_title;
        title.append(titleText);
        //Release and votes
        let ReleaseVotes = document.createElement("div");
        ReleaseVotes.classList.add("movie-info");
        //1. Release
        let releaseInfo = document.createElement("div");
        releaseInfo.id = "info";
        let releaseIndicator = document.createElement("p");
        releaseIndicator.id = "info-indicator";
        releaseIndicator.innerText = "Date Released:";
        let actualRelease = document.createElement("p");
        actualRelease.id = "release";
        actualRelease.innerText = movieList.results[i].release_date;
        releaseInfo.append(releaseIndicator);
        releaseInfo.append(actualRelease);
        ReleaseVotes.append(releaseInfo);
        //2. Votes
        let votedInfo = document.createElement("div");
        votedInfo.id = "info";
        let votedIndicator = document.createElement("p");
        votedIndicator.id = "info-indicator";
        votedIndicator.innerText = "Voted:";
        let actualVoted = document.createElement("p");
        actualVoted.id = "voted";
        actualVoted.innerText = movieList.results[i].vote_count;
        votedInfo.append(votedIndicator);
        votedInfo.append(actualVoted);
        ReleaseVotes.append(votedInfo);
        //favorite icon
        let favoriteIconContainer = document.createElement("div");
        favoriteIconContainer.classList.add("movie-actions");
        if (movieList.results[i].favorite === true) {
          favoriteIconContainer.classList.add("favorite");
        }
        favoriteIconContainer.addEventListener("click", () => {
          //add the clicked movie to favorites table
          addToFavorite(
            movieList.results[i].original_title,
            movieList.results[i].id,
            movieList.results[i].poster_path
          );
        });
        favoriteIconContainer.innerHTML = `
            <svg
              class="favorite-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              />
            </svg>
        `;
        imageContainer.append(favoriteIconContainer);

        //finaly append everything together to create a full card
        movieCard.append(imageContainer);
        movieCard.append(title);
        movieCard.append(ReleaseVotes);
        // movieCard.append(favoriteIconContainer);
        //add to the page
        movieListContainer.append(movieCard);
      }
    })
    .catch((err) => console.error(err));
}
getMoviesList();

function addToFavorite(movieTitle, movieId, cover) {
  const bodyData = {
    title: movieTitle,
    coverImage: cover,
    movieId: movieId,
  };

  fetch("http://localhost:5000/favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Successfully created the resource:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
